import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Calendar, Clock, MapPin, User, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { DutyRoster, DutyRosterTemplate } from '../services/api';
import { getVisibleEmployees } from '../utils/utils';

const DutyRosterPage: React.FC = () => {
  const { user } = useAuth();
  const { dutyRosterData, dutyRosterTemplates, employees } = useData();

  const [rosters, setRosters] = useState<DutyRoster[]>(dutyRosterData);
  const [templates, setTemplates] = useState<DutyRosterTemplate[]>(dutyRosterTemplates);
  const [filteredRosters, setFilteredRosters] = useState<DutyRoster[]>(dutyRosterData);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedShift, setSelectedShift] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const visibleEmployees = getVisibleEmployees(employees, user);

  useEffect(() => {
    let filtered = rosters;

    if (selectedDate) {
      filtered = filtered.filter(roster => roster.date === selectedDate);
    }

    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(roster => roster.department === selectedDepartment);
    }

    if (selectedShift !== 'All') {
      filtered = filtered.filter(roster => roster.shift === selectedShift);
    }

    setFilteredRosters(filtered);
  }, [rosters, selectedDate, selectedDepartment, selectedShift]);

  const handleAddRoster = (newRoster: Omit<DutyRoster, 'id' | 'assignedBy' | 'assignedAt'>) => {
    const roster: DutyRoster = {
      ...newRoster,
      id: `DR${Date.now()}`,
      assignedBy: user?.name || 'System',
      assignedAt: new Date().toISOString(),
    };
    setRosters([...rosters, roster]);
    setIsAddDialogOpen(false);
  };

  const handleUpdateRosterStatus = (id: string, status: DutyRoster['status']) => {
    setRosters(rosters.map(roster =>
      roster.id === id ? { ...roster, status } : roster
    ));
  };

  const handleDeleteRoster = (id: string) => {
    setRosters(rosters.filter(roster => roster.id !== id));
  };

  const getStatusBadge = (status: DutyRoster['status']) => {
    const variants = {
      'Scheduled': 'default',
      'Completed': 'secondary',
      'Cancelled': 'destructive',
      'On Leave': 'outline',
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const departments = ['All', ...Array.from(new Set(rosters.map(r => r.department)))];
  const shifts = ['All', ...Array.from(new Set(rosters.map(r => r.shift)))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Duty Roster Management</h1>
          <p className="text-muted-foreground">Manage employee duty assignments and schedules</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Duty Roster Templates</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {templates.map(template => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Department: {template.department}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {template.shifts.map((shift, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border rounded">
                            <div>
                              <span className="font-medium">{shift.shiftName}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {shift.startTime} - {shift.endTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Required: {shift.requiredStaff}</span>
                              <Badge variant="outline">{shift.location}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Roster Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Duty Roster Entry</DialogTitle>
              </DialogHeader>
              <AddRosterForm
                employees={visibleEmployees}
                onSubmit={handleAddRoster}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="shift">Shift</Label>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map(shift => (
                    <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDate(new Date().toISOString().split('T')[0]);
                  setSelectedDepartment('All');
                  setSelectedShift('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roster Table */}
      <Card>
        <CardHeader>
          <CardTitle>Duty Roster ({filteredRosters.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRosters.map(roster => (
                <TableRow key={roster.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {roster.empName}
                    </div>
                  </TableCell>
                  <TableCell>{roster.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(roster.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{roster.shift}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {roster.startTime} - {roster.endTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {roster.location}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(roster.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Select
                        value={roster.status}
                        onValueChange={(value: DutyRoster['status']) =>
                          handleUpdateRosterStatus(roster.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                          <SelectItem value="On Leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRoster(roster.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRosters.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No duty roster entries found for the selected filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface AddRosterFormProps {
  employees: any[];
  onSubmit: (roster: Omit<DutyRoster, 'id' | 'assignedBy' | 'assignedAt'>) => void;
  onCancel: () => void;
}

const AddRosterForm: React.FC<AddRosterFormProps> = ({ employees, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    empId: '',
    empName: '',
    department: '',
    shift: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '18:00',
    location: 'Head Office',
    status: 'Scheduled' as DutyRoster['status'],
    notes: '',
  });

  const handleEmployeeChange = (empId: string) => {
    const employee = employees.find(emp => emp.id === empId);
    if (employee) {
      setFormData({
        ...formData,
        empId,
        empName: employee.name,
        department: employee.department,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="employee">Employee</Label>
          <Select value={formData.empId} onValueChange={handleEmployeeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map(employee => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name} - {employee.department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="shift">Shift</Label>
          <Select value={formData.shift} onValueChange={(value) => setFormData({...formData, shift: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Morning Shift">Morning Shift</SelectItem>
              <SelectItem value="Evening Shift">Evening Shift</SelectItem>
              <SelectItem value="Night Shift">Night Shift</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Head Office">Head Office</SelectItem>
              <SelectItem value="Branch B">Branch B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({...formData, startTime: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({...formData, endTime: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="Optional notes..."
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Roster Entry
        </Button>
      </div>
    </form>
  );
};

export default DutyRosterPage;