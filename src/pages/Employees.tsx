import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { getStatusColor } from '../services/api';
import { Plus, Search, Eye, Pencil, ChevronUp, ChevronDown, ArrowUpDown, UserX, Users } from 'lucide-react';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useToastContext } from '../context/ToastContext';

// ─── Inline styles matching Dashboard aesthetic ───────────────────────────────
const S = `
  *{box-sizing:border-box;}
  @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  .emp-pg{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;padding:22px 28px;background:#f0f2f8;min-height:100vh;}

  /* Header */
  .emp-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap;gap:12px;}
  .emp-title{margin:0;font-size:27px;font-weight:800;color:#1e1b4b;line-height:1.15;}
  .emp-sub{margin:4px 0 0;font-size:11px;color:#9ca3af;}
  .emp-count-badge{display:inline-flex;align-items:center;gap:5px;background:#dcfce7;padding:3px 10px;border-radius:20px;font-size:9px;font-weight:700;color:#166534;margin-left:10px;}
  .emp-count-dot{width:6px;height:6px;border-radius:50%;background:#10b981;animation:pulse 1.5s infinite;}

  /* Add button */
  .emp-add-btn{background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:30px;padding:9px 20px;color:#fff;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 4px 14px rgba(99,102,241,.4);transition:opacity .15s,transform .15s;}
  .emp-add-btn:hover{opacity:.9;transform:translateY(-1px);}

  /* Filter card */
  .emp-card{background:#fff;border-radius:16px;padding:18px 20px;box-shadow:0 1px 10px rgba(0,0,0,.07);animation:up .4s ease both;}

  /* Inputs */
  .emp-input{height:36px;border:1px solid #e5e7eb;border-radius:10px;padding:0 12px;font-size:12px;color:#374151;outline:none;transition:border .15s,box-shadow .15s;background:#fafafa;width:100%;}
  .emp-input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12);background:#fff;}
  .emp-select{height:36px;border:1px solid #e5e7eb;border-radius:10px;padding:0 10px;font-size:12px;color:#374151;outline:none;background:#fafafa;cursor:pointer;transition:border .15s;}
  .emp-select:focus{border-color:#6366f1;background:#fff;}
  .emp-search-wrap{position:relative;flex:1;min-width:200px;}
  .emp-search-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none;}
  .emp-search-wrap .emp-input{padding-left:34px;}

  /* Clear btn */
  .emp-clear-btn{height:36px;padding:0 14px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;font-size:11px;font-weight:600;color:#6b7280;cursor:pointer;white-space:nowrap;transition:background .12s,color .12s;}
  .emp-clear-btn:hover{background:#f3f4f6;color:#374151;}

  /* Checkbox toggle */
  .emp-check-label{font-size:11px;display:flex;align-items:center;gap:5px;cursor:pointer;color:#6b7280;white-space:nowrap;}

  /* Bulk action bar */
  .emp-bulk-bar{background:linear-gradient(135deg,#eff6ff,#f5f3ff);border:1px solid #c7d2fe;border-radius:14px;padding:10px 18px;display:flex;align-items:center;gap:12px;margin-bottom:12px;animation:up .25s ease;}
  .emp-bulk-count{font-size:12px;font-weight:700;color:#6366f1;}
  .emp-terminate-btn{background:linear-gradient(135deg,#ef4444,#dc2626);border:none;border-radius:8px;padding:7px 14px;color:#fff;font-size:11px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:5px;transition:opacity .15s;}
  .emp-terminate-btn:hover{opacity:.85;}

  /* Table */
  .emp-table-wrap{overflow-x:auto;border-radius:12px;border:1px solid #f1f5f9;}
  .emp-table{width:100%;border-collapse:collapse;font-size:12px;}
  .emp-table thead tr{background:linear-gradient(135deg,#f8f9ff,#f3f4f6);}
  .emp-table th{padding:11px 14px;text-align:left;font-size:10px;font-weight:700;color:#6b7280;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;border-bottom:1px solid #f1f5f9;cursor:pointer;user-select:none;}
  .emp-table th:hover{color:#6366f1;}
  .emp-table td{padding:11px 14px;border-bottom:1px solid #f8f9fb;color:#374151;vertical-space:middle;vertical-align:middle;}
  .emp-table tbody tr{transition:background .1s;}
  .emp-table tbody tr:hover{background:#f5f7ff;}
  .emp-table tbody tr:last-child td{border-bottom:none;}

  /* Avatar */
  .emp-avatar{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;}
  .emp-name-cell{display:flex;align-items:center;gap:9px;font-weight:600;color:#1e1b4b;}

  /* Pills */
  .emp-pill{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:9px;font-weight:700;white-space:nowrap;}
  .pill-active{background:#dcfce7;color:#166534;}
  .pill-probation{background:#fef3c7;color:#d97706;}
  .pill-terminated{background:#fef2f2;color:#dc2626;}
  .pill-notice{background:#eff6ff;color:#2563eb;}
  .pill-default{background:#f3f4f6;color:#6b7280;}

  /* Action icons */
  .emp-ico{width:28px;height:28px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7280;transition:all .15s;}
  .emp-ico:hover{background:#eff6ff;border-color:#c7d2fe;color:#6366f1;}

  /* Mono */
  .emp-mono{font-family:'SF Mono',Consolas,monospace;font-size:10.5px;color:#9ca3af;}

  /* Pagination */
  .emp-pag-btn{height:30px;padding:0 10px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;font-size:11px;color:#374151;cursor:pointer;transition:all .12s;display:flex;align-items:center;}
  .emp-pag-btn:hover:not(:disabled){background:#eff6ff;border-color:#c7d2fe;color:#6366f1;}
  .emp-pag-btn:disabled{opacity:.4;cursor:default;}
  .emp-pag-btn.active{background:linear-gradient(135deg,#6366f1,#8b5cf6);border-color:#6366f1;color:#fff;}
  .emp-per-page{height:30px;border:1px solid #e5e7eb;border-radius:8px;padding:0 8px;font-size:11px;color:#374151;background:#fff;cursor:pointer;}

  /* Section header */
  .emp-sec-head{display:flex;align-items:center;gap:7px;margin-bottom:14px;}
  .emp-sec-title{font-size:13px;font-weight:700;color:#1e1b4b;}
  .emp-badge{padding:2px 8px;border-radius:20px;font-size:9px;font-weight:700;white-space:nowrap;}

  /* Empty state */
  .emp-empty{text-align:center;padding:50px 20px;color:#9ca3af;}
  .emp-empty-icon{font-size:32px;margin-bottom:10px;}
`;

const getInitials = (name: string) =>
  name.split(' ').filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase();

const getPillClass = (status: string) => {
  if (!status) return 'emp-pill pill-default';
  const s = status.toLowerCase();
  if (s.includes('active'))     return 'emp-pill pill-active';
  if (s.includes('probation'))  return 'emp-pill pill-probation';
  if (s.includes('terminated')) return 'emp-pill pill-terminated';
  if (s.includes('notice'))     return 'emp-pill pill-notice';
  return 'emp-pill pill-default';
};

type SortKey = 'id' | 'name' | 'department' | 'designation' | 'employmentType' | 'jobStatus' | 'shift' | 'dateOfJoining';
type SortDir = 'asc' | 'desc';

export default function Employees() {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { employees, setEmployees, departments, jobStatuses, workModes } = useData();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [showTerminated, setShowTerminated] = useState(false);
  const [terminateConfirm, setTerminateConfirm] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);

  // ── All logic identical to original ──────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = employees.filter(e => {
      if (!showTerminated && e.jobStatus === 'Terminated') return false;
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (deptFilter && e.department !== deptFilter) return false;
      if (statusFilter && e.jobStatus !== statusFilter) return false;
      if (modeFilter && e.workMode !== modeFilter) return false;
      return true;
    });
    list.sort((a: any, b: any) => {
      const av = a[sortKey] || '';
      const bv = b[sortKey] || '';
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [employees, search, deptFilter, statusFilter, modeFilter, sortKey, sortDir, showTerminated]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const selectAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map(e => e.id)));
  };

  const terminateSelected = () => {
    setEmployees(prev => prev.map(e => selected.has(e.id) ? { ...e, jobStatus: 'Terminated' } : e));
    showToast(`${selected.size} employee(s) terminated successfully`);
    setSelected(new Set());
    setTerminateConfirm(false);
  };

  const clearFilters = () => { setSearch(''); setDeptFilter(''); setStatusFilter(''); setModeFilter(''); };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={10} style={{ opacity: .3, marginLeft: 3 }} />;
    return sortDir === 'asc'
      ? <ChevronUp size={10} style={{ marginLeft: 3, color: '#6366f1' }} />
      : <ChevronDown size={10} style={{ marginLeft: 3, color: '#6366f1' }} />;
  };

  const activeCount = employees.filter(e => e.jobStatus !== 'Terminated').length;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{S}</style>
      <div className="emp-pg">

        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <div className="emp-head">
          <div>
            <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>Organization</p>
            <h1 className="emp-title">
              Employees
              <span className="emp-count-badge">
                <span className="emp-count-dot" />
                {activeCount} Active
              </span>
            </h1>
            <p className="emp-sub">Manage all employees in your organization</p>
          </div>
          <button className="emp-add-btn" onClick={() => navigate('/employees/add')}>
            <Plus size={13} /> Add Employee
          </button>
        </div>

        {/* ══ FILTER CARD ═════════════════════════════════════════════════════ */}
        <div className="emp-card" style={{ marginBottom: 12 }}>
          <div className="emp-sec-head">
            <Search size={14} color="#6366f1" />
            <span className="emp-sec-title">Filter Employees</span>
            {(search || deptFilter || statusFilter || modeFilter) && (
              <span className="emp-badge" style={{ background: '#eff6ff', color: '#6366f1', marginLeft: 'auto' }}>
                Filters active
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search — stays inside filter card, above table */}
            <div className="emp-search-wrap">
              <Search size={14} className="emp-search-icon" />
              <input
                className="emp-input"
                placeholder="Search by name or ID..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0); }}
              />
            </div>

            <select className="emp-select" style={{ width: 160 }} value={deptFilter} onChange={e => { setDeptFilter(e.target.value); setPage(0); }}>
              <option value="">All Departments</option>
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>

            <select className="emp-select" style={{ width: 140 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(0); }}>
              <option value="">All Statuses</option>
              {jobStatuses.map(s => <option key={s}>{s}</option>)}
            </select>

            <select className="emp-select" style={{ width: 140 }} value={modeFilter} onChange={e => { setModeFilter(e.target.value); setPage(0); }}>
              <option value="">All Work Modes</option>
              {workModes.map(m => <option key={m}>{m}</option>)}
            </select>

            <label className="emp-check-label">
              <input type="checkbox" checked={showTerminated} onChange={e => setShowTerminated(e.target.checked)} />
              Show terminated
            </label>

            {(search || deptFilter || statusFilter || modeFilter) && (
              <button className="emp-clear-btn" onClick={clearFilters}>Clear All</button>
            )}
          </div>
        </div>

        {/* ══ BULK ACTION BAR ══════════════════════════════════════════════════ */}
        {selected.size > 0 && (
          <div className="emp-bulk-bar">
            <Users size={14} color="#6366f1" />
            <span className="emp-bulk-count">{selected.size} employee{selected.size > 1 ? 's' : ''} selected</span>
            <div style={{ flex: 1 }} />
            <button className="emp-terminate-btn" onClick={() => setTerminateConfirm(true)}>
              <UserX size={12} /> Terminate Selected
            </button>
          </div>
        )}

        {/* ══ TABLE CARD ═══════════════════════════════════════════════════════ */}
        <div className="emp-card">
          <div className="emp-sec-head">
            <Users size={14} color="#6366f1" />
            <span className="emp-sec-title">All Employees</span>
            <span className="emp-badge" style={{ background: '#eff6ff', color: '#6366f1', marginLeft: 'auto' }}>
              {filtered.length} records
            </span>
          </div>

          <div className="emp-table-wrap">
            <table className="emp-table">
              <thead>
                <tr>
                  <th style={{ width: 36 }}>
                    <input type="checkbox" checked={paged.length > 0 && selected.size === paged.length} onChange={selectAll} />
                  </th>
                  <th onClick={() => toggleSort('id')}>Emp ID <SortIcon col="id" /></th>
                  <th onClick={() => toggleSort('name')}>Name <SortIcon col="name" /></th>
                  <th onClick={() => toggleSort('department')}>Department <SortIcon col="department" /></th>
                  <th onClick={() => toggleSort('designation')}>Designation <SortIcon col="designation" /></th>
                  <th onClick={() => toggleSort('employmentType')}>Type <SortIcon col="employmentType" /></th>
                  <th onClick={() => toggleSort('jobStatus')}>Status <SortIcon col="jobStatus" /></th>
                  <th>Shift</th>
                  <th onClick={() => toggleSort('dateOfJoining')}>Joined <SortIcon col="dateOfJoining" /></th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={10}>
                      <div className="emp-empty">
                        <div className="emp-empty-icon">👥</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>No employees found</div>
                        <div style={{ fontSize: 11 }}>Try adjusting your filters</div>
                      </div>
                    </td>
                  </tr>
                ) : paged.map(e => (
                  <tr
                    key={e.id}
                    style={{
                      ...(selected.has(e.id) ? { background: '#f5f3ff' } : {}),
                      ...(e.jobStatus === 'Terminated' ? { opacity: 0.5 } : {}),
                    }}
                  >
                    <td>
                      <input type="checkbox" checked={selected.has(e.id)} onChange={() => toggleSelect(e.id)} />
                    </td>
                    <td className="emp-mono">{e.id}</td>
                    <td>
                      <div className="emp-name-cell">
                        <div className="emp-avatar">{e.avatar || getInitials(e.name)}</div>
                        <span>{e.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#6b7280' }}>{e.department}</td>
                    <td style={{ color: '#6b7280' }}>{e.designation}</td>
                    <td style={{ color: '#6b7280', fontSize: 11 }}>{e.employmentType}</td>
                    <td>
                      <span className={getPillClass(e.jobStatus)}>{e.jobStatus}</span>
                    </td>
                    <td style={{ fontSize: 11.5, color: '#6b7280' }}>{e.shift}</td>
                    <td className="emp-mono">{e.dateOfJoining}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 5 }}>
                        <button className="emp-ico" title="View" onClick={() => navigate(`/employees/${e.id}`)}>
                          <Eye size={13} />
                        </button>
                        <button className="emp-ico" title="Edit" onClick={() => navigate('/employees/add')}>
                          <Pencil size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, fontSize: 12, color: '#9ca3af', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>
                Showing{' '}
                <strong style={{ color: '#374151' }}>
                  {filtered.length === 0 ? 0 : page * perPage + 1}–{Math.min((page + 1) * perPage, filtered.length)}
                </strong>{' '}
                of <strong style={{ color: '#374151' }}>{filtered.length}</strong>
              </span>
              <select
                className="emp-per-page"
                value={perPage}
                onChange={e => { setPerPage(+e.target.value); setPage(0); }}
              >
                {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n} / page</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 4 }}>
              <button className="emp-pag-btn" disabled={page === 0} onClick={() => setPage(p => p - 1)}>← Prev</button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <button
                  key={i}
                  className={`emp-pag-btn${page === i ? ' active' : ''}`}
                  onClick={() => setPage(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button className="emp-pag-btn" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next →</button>
            </div>
          </div>
        </div>

        {/* ── Confirm Dialog (unchanged) ── */}
        <ConfirmDialog
          open={terminateConfirm}
          title="Terminate Selected Employees"
          message={`Are you sure you want to terminate ${selected.size} selected employee(s)? Their status will be set to Terminated and they will be hidden from the active list.`}
          onConfirm={terminateSelected}
          onCancel={() => setTerminateConfirm(false)}
        />

      </div>
    </>
  );
}