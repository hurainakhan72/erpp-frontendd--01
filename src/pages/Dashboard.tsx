import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import {
  Users, UserCheck, CalendarDays, AlertTriangle, Activity,
  Cake, TrendingUp, BarChart3, Plus, Megaphone, Bell,
  Clock, ShieldAlert, FileText, Target, Award, Zap,
} from "lucide-react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area,
} from "recharts";

// ── Static chart data ──────────────────────────────────────────────────────
const deptDistribution = [
  { name: "Engineering", value: 84, color: "#a855f7" },
  { name: "Sales",       value: 49, color: "#ec4899" },
  { name: "Marketing",   value: 45, color: "#f97316" },
  { name: "HR",          value: 34, color: "#14b8a6" },
  { name: "Finance",     value: 35, color: "#06b6d4" },
];

const monthlyAttendance = [
  { month: "Oct", present: 205, absent: 30, pct: 87 },
  { month: "Nov", present: 192, absent: 45, pct: 81 },
  { month: "Dec", present: 180, absent: 57, pct: 76 },
  { month: "Jan", present: 220, absent: 17, pct: 93 },
  { month: "Feb", present: 215, absent: 22, pct: 91 },
  { month: "Mar", present: 218, absent: 29, pct: 88 },
];

const headcountGrowth = [
  { month: "Oct", count: 214 },
  { month: "Nov", count: 224 },
  { month: "Dec", count: 228 },
  { month: "Jan", count: 236 },
  { month: "Feb", count: 242 },
  { month: "Mar", count: 247 },
];

const leaveTypesData = [
  { type: "Sick",     used: 38, color: "#ef4444" },
  { type: "Casual",   used: 52, color: "#f97316" },
  { type: "Annual",   used: 71, color: "#6366f1" },
  { type: "Maternity",used: 12, color: "#ec4899" },
];

const announcements = [
  { title: "Office Closure — Eid ul Fitr",   date: "Mar 20, 2026", text: "Office closed from March 28 to April 1 for Eid ul Fitr." },
  { title: "Annual Performance Review",       date: "Mar 15, 2026", text: "FY 2025-26 reviews begin April 5. Managers prepare evaluations." },
  { title: "New Health Insurance Policy",     date: "Mar 10, 2026", text: "Updated coverage now includes dental and vision for all full-time staff." },
];

// ── CSS-in-JS global animation ──────────────────────────────────────────────
const globalCSS = `
  @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  .hero-card {
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    animation: fadeUp 0.4s ease both;
  }
  .hero-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.18) !important;
  }
  .hero-card:active { transform: scale(0.98); }
  .nav-btn {
    transition: background 0.15s, color 0.15s, transform 0.15s;
  }
  .nav-btn:hover { transform: translateY(-1px); }
  .notif-item:hover { background: #f0f4ff !important; }
  .action-row:hover { background: #f8fafc; border-radius: 10px; }
  .cal-day:hover { background: #eff6ff !important; cursor: pointer; }
  .white-card {
    animation: fadeUp 0.5s ease both;
  }
`;

// ── Badge helper ────────────────────────────────────────────────────────────
const Badge = ({ bg, color, children }: { bg: string; color: string; children: React.ReactNode }) => (
  <span style={{ background: bg, color, padding: "2px 9px", borderRadius: "20px", fontSize: "9px", fontWeight: "700", whiteSpace: "nowrap" as const }}>
    {children}
  </span>
);

// ── Progress bar ────────────────────────────────────────────────────────────
const ProgressBar = ({ value, color, max = 100 }: { value: number; color: string; max?: number }) => (
  <div style={{ height: "5px", background: "#f3f4f6", borderRadius: "4px", overflow: "hidden", marginTop: "6px" }}>
    <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: "4px", transition: "width 0.6s ease" }} />
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const { user } = useAuth();
  const { leaveRequests, employees, globalDays } = useData();
  const navigate = useNavigate();

  const [time,              setTime]              = useState(new Date());
  const [calMonth,          setCalMonth]          = useState(new Date().getMonth());
  const [calYear,           setCalYear]           = useState(new Date().getFullYear());
  const [showNotifications, setShowNotifications] = useState(false);
  const [hoveredCard,       setHoveredCard]       = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ── Real data from context ──
  const total         = employees?.length || 0;
  const activeToday   = employees?.filter((e: any) => e.status === "active").length || 0;
  const pendingLeaves = leaveRequests?.filter((l: any) => l.status === "Pending").length || 0;
  const onLeaveToday  = leaveRequests?.filter((l: any) => {
    const today = new Date().toISOString().split("T")[0];
    return l.status === "Approved" && l.start_date <= today && l.end_date >= today;
  }).length || 0;

  const attendanceRate   = total > 0 ? Math.round((activeToday / total) * 100) : 0;
  const leaveUtilization = 42;
  const onTimeRate       = 93.1;
  const retentionRate    = 94.2;

  // ── Time ──
  const hour     = time.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr  = time.toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeStr  = time.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  // ── Notifications ──
  const notifications = [
    { id:1, title:"Leave Request Pending",  message:`${pendingLeaves} requests awaiting approval`, time:"Just now",  link:"/leave",      read:false },
    { id:2, title:"Incomplete Attendance",  message:"3 employees haven't marked attendance",        time:"2 hrs ago", link:"/attendance", read:false },
    { id:3, title:"Contract Expiry",        message:"Usman Malik's contract expires in 8 days",     time:"Yesterday", link:"/employees",  read:false },
    { id:4, title:"New Employee Added",     message:"Bilal Ahmed onboarded successfully",            time:"Yesterday", link:"/employees",  read:true  },
    { id:5, title:"Probation Ending",       message:"Fatima Raza's probation ends in 12 days",      time:"2 days ago",link:"/employees",  read:true  },
  ];
  const unreadCount = notifications.filter(n => !n.read).length;

  // ── Hero cards — real data + navigate + hover ──
  const heroCards = [
    {
      gradient: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
      shadow: "rgba(102,126,234,0.4)",
      icon: <Users size={20} color="#fff"/>,
      val: total,
      label: "Total Employees",
      sub: "+12% this quarter",
      badge: "↑ 2.4%",
      link: "/employees",
    },
    {
      gradient: "linear-gradient(135deg,#11998e 0%,#38ef7d 100%)",
      shadow: "rgba(17,153,142,0.4)",
      icon: <UserCheck size={20} color="#fff"/>,
      val: activeToday || 218,
      label: "Active Today",
      sub: "Live attendance",
      badge: "Live",
      link: "/attendance",
    },
    {
      gradient: "linear-gradient(135deg,#b721ff 0%,#21d4fd 100%)",
      shadow: "rgba(183,33,255,0.35)",
      icon: <CalendarDays size={20} color="#fff"/>,
      val: pendingLeaves || 2,
      label: "Pending Leaves",
      sub: "Need approval",
      badge: "Action",
      link: "/leave",
    },
  ];

  // ── Pending actions ──
  const pendingActions = [
    { text:`${pendingLeaves || 2} leave requests awaiting approval`, action:"Review →", emoji:"📋", link:"/leave" },
    { text:"Attendance incomplete — 3 employees",                    action:"Mark →",   emoji:"⏰", link:"/attendance" },
    { text:"Bank info missing — EMP004, EMP005",                     action:"Fix →",    emoji:"🏦", link:"/employees" },
  ];

  // ── Urgent alerts ──
  const urgentAlerts = [
    { name:"Usman Malik",  text:"Contract expiry in 8 days",  badge:"URGENT",    bg:"#fef2f2", color:"#dc2626" },
    { name:"Fatima Raza",  text:"Probation ends in 12 days",  badge:"PROBATION", bg:"#fefce8", color:"#ca8a04" },
    { name:"Bilal Ahmed",  text:"Bank info missing",           badge:"MISSING",   bg:"#eff6ff", color:"#2563eb" },
    { name:"Ahmed Ali",    text:"Absent 3 days in a row",      badge:"ABSENT",    bg:"#fef2f2", color:"#dc2626" },
  ];

  // ── Recent activity ──
  const recentActivity = [
    { initials:"SK", color:"#f97316", text:"Sara Khan's leave approved",  time:"2 hrs ago",  by:"Super Admin", badge:"Approved", bc:"#dcfce7", tc:"#166534" },
    { initials:"BA", color:"#6366f1", text:"Bilal Ahmed added as EMP005", time:"Yesterday",  by:"HR1",         badge:"New Hire", bc:"#eff6ff", tc:"#2563eb" },
    { initials:"UM", color:"#ef4444", text:"Usman's leave rejected",      time:"3 days ago", by:"HR1",         badge:"Rejected", bc:"#fef2f2", tc:"#dc2626" },
    { initials:"FR", color:"#14b8a6", text:"Fatima salary updated",       time:"4 days ago", by:"Super Admin", badge:"Updated",  bc:"#f0fdf4", tc:"#166534" },
  ];

  // ── KPI metrics ──
  const kpiMetrics = [
    { label:"Attendance Rate",  value:attendanceRate||88,  color:"#10b981", icon:"✓",  target:90 },
    { label:"Leave Utilization",value:leaveUtilization,     color:"#f97316", icon:"📋", target:60 },
    { label:"On-time Rate",     value:onTimeRate,           color:"#6366f1", icon:"⚡", target:95 },
    { label:"Retention Rate",   value:retentionRate,        color:"#ec4899", icon:"🏆", target:95 },
  ];

  // ── Top performers (from employees) ──
  const topPerformers = useMemo(() => {
    if (!employees?.length) return [
      { name:"Sara Khan",    dept:"Sales",     score:98, initials:"SK", color:"#f97316" },
      { name:"Ali Raza",     dept:"Engineering",score:95, initials:"AR", color:"#6366f1" },
      { name:"Hina Malik",   dept:"HR",        score:92, initials:"HM", color:"#ec4899" },
      { name:"Bilal Ahmed",  dept:"Marketing", score:90, initials:"BA", color:"#14b8a6" },
    ];
    return employees.slice(0, 4).map((e: any) => ({
      name: e.name,
      dept: e.department || "—",
      score: Math.floor(Math.random() * 10) + 88,
      initials: e.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
      color: ["#6366f1","#ec4899","#f97316","#14b8a6"][Math.floor(Math.random()*4)],
    }));
  }, [employees]);

  // ── Calendar ──
  const calendarEvents = useMemo(() => {
    const events: Record<string, { type: string; label: string; color: string }[]> = {};
    employees?.forEach((emp: any) => {
      if (!emp.dob) return;
      const d = new Date(emp.dob);
      if (d.getMonth() === calMonth) {
        const day = d.getDate();
        if (!events[day]) events[day] = [];
        events[day].push({ type:"birthday", label:emp.name, color:"#ec4899" });
      }
    });
    globalDays?.forEach((gd: any) => {
      if (!gd.is_active) return;
      const gd2 = new Date(gd.date);
      if (gd2.getMonth() === calMonth && gd2.getFullYear() === calYear) {
        const day = gd2.getDate();
        if (!events[day]) events[day] = [];
        events[day].push({ type:gd.type, label:gd.title, color:gd.type==="emergency"?"#ef4444":"#10b981" });
      }
    });
    return events;
  }, [employees, globalDays, calMonth, calYear]);

  // ── Birthdays ──
  const upcomingBirthdays = useMemo(() => {
    const today = new Date(); today.setHours(0,0,0,0);
    const list: { name:string; date:Date; daysUntil:number; initials:string; dept:string }[] = [];
    employees?.forEach((emp: any) => {
      if (!emp.dob) return;
      const dob = new Date(emp.dob);
      let bday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
      if (bday < today) bday = new Date(today.getFullYear()+1, dob.getMonth(), dob.getDate());
      const daysUntil = Math.ceil((bday.getTime()-today.getTime())/86400000);
      if (daysUntil <= 30) {
        list.push({
          name: emp.name,
          dept: emp.department || "—",
          date: bday,
          daysUntil,
          initials: emp.name.split(" ").map((n:string)=>n[0]).join("").slice(0,2).toUpperCase(),
        });
      }
    });
    return list.sort((a,b)=>a.daysUntil-b.daysUntil);
  }, [employees]);

  const monthNames   = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const daysInMonth  = new Date(calYear, calMonth+1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();

  // ── card style ──
  const card: React.CSSProperties = { background:"#fff", borderRadius:"18px", padding:"20px", boxShadow:"0 1px 8px rgba(0,0,0,0.06)" };

  return (
    <>
      <style>{globalCSS}</style>
      <div style={{ padding:"28px 32px", background:"#f1f3f9", minHeight:"100vh", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

        {/* ── Header ── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px", flexWrap:"wrap", gap:"12px" }}>
          <div>
            <p style={{ fontSize:"13px", color:"#6b7280", margin:0 }}>Welcome back,</p>
            <h1 style={{ fontSize:"30px", fontWeight:"800", color:"#1e1b4b", margin:"2px 0 0", lineHeight:1.1, display:"flex", alignItems:"center", gap:"10px" }}>
              Super Admin 👋
              <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"#dcfce7", padding:"3px 10px", borderRadius:"20px" }}>
                <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#10b981", animation:"pulse-dot 1.5s infinite" }}/>
                <span style={{ fontSize:"9px", fontWeight:"700", color:"#166534" }}>LIVE</span>
              </span>
            </h1>
            <p style={{ fontSize:"11px", color:"#9ca3af", marginTop:"5px" }}>📅 {dateStr} &nbsp;·&nbsp; 🕐 {timeStr} PKT</p>
          </div>

          <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
            {/* Bell */}
            <div style={{ position:"relative" }}>
              <button className="nav-btn" onClick={()=>setShowNotifications(!showNotifications)}
                style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"40px", padding:"8px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", fontSize:"12px", color:"#374151" }}>
                <Bell size={16} color="#6b7280"/> Alerts
                {unreadCount>0 && <span style={{ position:"absolute", top:"-6px", right:"-6px", background:"#ef4444", color:"#fff", fontSize:"9px", fontWeight:"700", padding:"2px 6px", borderRadius:"20px" }}>{unreadCount}</span>}
              </button>

              {showNotifications && (
                <>
                  <div style={{ position:"fixed", inset:0, zIndex:998 }} onClick={()=>setShowNotifications(false)}/>
                  <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, width:"320px", background:"#fff", borderRadius:"16px", boxShadow:"0 20px 40px rgba(0,0,0,0.12)", zIndex:999, overflow:"hidden" }}>
                    <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6", display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:"13px", fontWeight:"700" }}>Notifications</span>
                      <span style={{ fontSize:"10px", color:"#9ca3af" }}>{unreadCount} unread</span>
                    </div>
                    <div style={{ maxHeight:"340px", overflowY:"auto" }}>
                      {notifications.map(n=>(
                        <div key={n.id} className="notif-item"
                          style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6", cursor:"pointer", background:n.read?"#fff":"#fefce8" }}
                          onClick={()=>{ navigate(n.link); setShowNotifications(false); }}>
                          <div style={{ fontSize:"12px", fontWeight:"600", color:"#1e1b4b" }}>{n.title}</div>
                          <div style={{ fontSize:"10px", color:"#6b7280", marginTop:"2px" }}>{n.message}</div>
                          <div style={{ fontSize:"9px", color:"#d1d5db", marginTop:"3px" }}>{n.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button className="nav-btn" onClick={()=>navigate("/employees/add")}
              style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"30px", padding:"10px 22px", color:"#fff", fontSize:"12px", fontWeight:"600", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px", boxShadow:"0 4px 14px rgba(99,102,241,0.4)" }}>
              <Plus size={14}/> Add Employee
            </button>
          </div>
        </div>

        {/* ── 3 Hero Cards — clickable + hover glow ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"24px" }}>
          {heroCards.map((c,i)=>(
            <div key={i} className="hero-card"
              style={{ animationDelay:`${i*0.08}s`, background:c.gradient, borderRadius:"20px", padding:"22px 20px", color:"#fff", position:"relative", overflow:"hidden",
                boxShadow: hoveredCard===i ? `0 20px 40px ${c.shadow}` : `0 8px 24px rgba(0,0,0,0.12)`, minHeight:"135px" }}
              onClick={()=>navigate(c.link)}
              onMouseEnter={()=>setHoveredCard(i)}
              onMouseLeave={()=>setHoveredCard(null)}>
              {/* icon */}
              <div style={{ width:"38px", height:"38px", borderRadius:"12px", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"12px" }}>
                {c.icon}
              </div>
              {/* value */}
              <div style={{ fontSize:"32px", fontWeight:"800", lineHeight:1 }}>{c.val}</div>
              <div style={{ fontSize:"11px", opacity:0.9, marginTop:"4px" }}>{c.label}</div>
              <div style={{ fontSize:"10px", opacity:0.7, marginTop:"2px" }}>{c.sub}</div>
              {/* top-right badge */}
              <span style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(255,255,255,0.25)", borderRadius:"20px", padding:"3px 10px", fontSize:"9px", fontWeight:"700" }}>
                {c.badge}
              </span>
              {/* decorative circles */}
              <div style={{ position:"absolute", width:"90px", height:"90px", borderRadius:"50%", background:"rgba(255,255,255,0.08)", bottom:"-20px", right:"-20px" }}/>
              <div style={{ position:"absolute", width:"55px", height:"55px", borderRadius:"50%", background:"rgba(255,255,255,0.07)", bottom:"20px", right:"30px" }}/>
              {/* arrow hint */}
              <div style={{ position:"absolute", bottom:"14px", right:"14px", fontSize:"11px", opacity:0.6 }}>tap ↗</div>
            </div>
          ))}
        </div>

        {/* ── KPI Metrics strip ── */}
        <div style={{ ...card, marginBottom:"20px", padding:"16px 24px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px" }}>
            <Target size={14} color="#6366f1"/>
            <span style={{ fontSize:"13px", fontWeight:"700", color:"#1e1b4b" }}>Key Performance Indicators</span>
            <span style={{ marginLeft:"auto", fontSize:"10px", color:"#9ca3af" }}>Monthly targets</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px" }}>
            {kpiMetrics.map((k,i)=>(
              <div key={i}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:"11px", color:"#6b7280" }}>{k.label}</span>
                  <span style={{ fontSize:"14px", fontWeight:"800", color:k.color }}>{k.value}%</span>
                </div>
                <ProgressBar value={k.value} color={k.color} max={100}/>
                <div style={{ fontSize:"9px", color:"#d1d5db", marginTop:"4px" }}>Target: {k.target}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Charts row: Bar + Donut ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
          {/* Monthly Attendance */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <BarChart3 size={15} color="#6366f1"/>
              <div>
                <div style={{ fontSize:"14px", fontWeight:"700", color:"#1e1b4b" }}>Monthly Attendance</div>
                <div style={{ fontSize:"10px", color:"#9ca3af" }}>Present vs Absent</div>
              </div>
              <Badge bg="#dcfce7" color="#166534">↗ +5.2%</Badge>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={monthlyAttendance} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
                <XAxis dataKey="month" tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:9, fill:"#9ca3af" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:"10px", border:"none", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:"11px" }}/>
                <Bar dataKey="present" name="Present" fill="#10b981" radius={[4,4,0,0]} barSize={20}/>
                <Bar dataKey="absent"  name="Absent"  fill="#ef4444" radius={[4,4,0,0]} barSize={20}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Mix */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <Users size={15} color="#a855f7"/>
              <div>
                <div style={{ fontSize:"14px", fontWeight:"700", color:"#1e1b4b" }}>Department Mix</div>
                <div style={{ fontSize:"10px", color:"#9ca3af" }}>Headcount distribution</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
              <div style={{ position:"relative", width:"145px", height:"145px", flexShrink:0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deptDistribution} cx="50%" cy="50%" innerRadius={42} outerRadius={60} dataKey="value" stroke="none">
                      {deptDistribution.map((d,i)=><Cell key={i} fill={d.color}/>)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                  <div style={{ fontSize:"17px", fontWeight:"800", color:"#1e1b4b" }}>{total||247}</div>
                  <div style={{ fontSize:"8px", color:"#9ca3af" }}>TOTAL</div>
                </div>
              </div>
              <div style={{ flex:1 }}>
                {deptDistribution.map((d,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"7px", padding:"5px 0", fontSize:"11px", borderBottom:"1px solid #f9fafb" }}>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:d.color, flexShrink:0 }}/>
                    <span style={{ flex:1, color:"#374151" }}>{d.name}</span>
                    <span style={{ fontWeight:"700", color:"#1e1b4b" }}>{d.value}</span>
                    <span style={{ color:"#d1d5db", fontSize:"10px" }}>{Math.round((d.value/(total||247))*100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Headcount Growth + Leave Types ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
          {/* Headcount Area Chart */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <TrendingUp size={15} color="#10b981"/>
              <div style={{ fontSize:"14px", fontWeight:"700", color:"#1e1b4b" }}>Headcount Growth</div>
              <span style={{ marginLeft:"auto", fontSize:"12px", fontWeight:"800", color:"#10b981" }}>260 ↑</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={headcountGrowth}>
                <defs>
                  <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
                <XAxis dataKey="month" tick={{ fontSize:10, fill:"#9ca3af" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:9, fill:"#9ca3af" }} axisLine={false} tickLine={false} domain={["dataMin - 10","dataMax + 10"]}/>
                <Tooltip contentStyle={{ borderRadius:"10px", border:"none", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:"11px" }}/>
                <Area type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={3} fill="url(#hcGrad)" dot={{ r:4, fill:"#a855f7", stroke:"#fff", strokeWidth:2 }}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Leave Breakdown */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <FileText size={15} color="#f97316"/>
              <div style={{ fontSize:"14px", fontWeight:"700", color:"#1e1b4b" }}>Leave Breakdown</div>
              <Badge bg="#fef3c7" color="#d97706">{pendingLeaves||2} Pending</Badge>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
              <div style={{ position:"relative", width:"130px", height:"130px", flexShrink:0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={leaveTypesData} cx="50%" cy="50%" innerRadius={36} outerRadius={54} dataKey="used" stroke="none">
                      {leaveTypesData.map((d,i)=><Cell key={i} fill={d.color}/>)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                  <div style={{ fontSize:"14px", fontWeight:"800", color:"#1e1b4b" }}>173</div>
                  <div style={{ fontSize:"7px", color:"#9ca3af" }}>TOTAL</div>
                </div>
              </div>
              <div style={{ flex:1 }}>
                {leaveTypesData.map((d,i)=>(
                  <div key={i} style={{ marginBottom:"10px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:"10px" }}>
                      <span style={{ color:"#374151", display:"flex", alignItems:"center", gap:"5px" }}>
                        <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:d.color, display:"inline-block" }}/>
                        {d.type}
                      </span>
                      <span style={{ fontWeight:"700", color:"#1e1b4b" }}>{d.used}</span>
                    </div>
                    <ProgressBar value={d.used} color={d.color} max={100}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Actions + Performance + Top Performers ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px", marginBottom:"20px" }}>
          {/* Pending Actions */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <AlertTriangle size={15} color="#f59e0b"/>
              <span style={{ fontSize:"13px", fontWeight:"700", color:"#1e1b4b" }}>Pending Actions</span>
              <Badge bg="#fef3c7" color="#d97706">{pendingActions.length}</Badge>
            </div>
            {pendingActions.map((a,i)=>(
              <div key={i} className="action-row" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 6px", borderBottom: i<pendingActions.length-1?"1px solid #f3f4f6":"none", transition:"background 0.15s" }}>
                <span style={{ fontSize:"16px" }}>{a.emoji}</span>
                <span style={{ flex:1, fontSize:"11px", color:"#374151" }}>{a.text}</span>
                <button onClick={()=>navigate(a.link)} style={{ background:"none", border:"none", color:"#6366f1", fontSize:"10px", fontWeight:"700", cursor:"pointer" }}>{a.action}</button>
              </div>
            ))}
          </div>

          {/* Urgent Alerts */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <ShieldAlert size={15} color="#ef4444"/>
              <span style={{ fontSize:"13px", fontWeight:"700", color:"#1e1b4b" }}>Urgent Alerts</span>
              <Badge bg="#fef2f2" color="#dc2626">{urgentAlerts.length}</Badge>
            </div>
            {urgentAlerts.map((a,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"9px 0", borderBottom: i<urgentAlerts.length-1?"1px solid #f3f4f6":"none" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"11px", fontWeight:"600", color:"#1e1b4b" }}>{a.name}</div>
                  <div style={{ fontSize:"9px", color:"#9ca3af", marginTop:"2px" }}>{a.text}</div>
                </div>
                <Badge bg={a.bg} color={a.color}>{a.badge}</Badge>
              </div>
            ))}
          </div>

          {/* Top Performers */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <Award size={15} color="#f59e0b"/>
              <span style={{ fontSize:"13px", fontWeight:"700", color:"#1e1b4b" }}>Top Performers</span>
              <Badge bg="#fefce8" color="#ca8a04">This Month</Badge>
            </div>
            {topPerformers.map((p,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"9px 0", borderBottom: i<topPerformers.length-1?"1px solid #f3f4f6":"none" }}>
                <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:p.color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontWeight:"700", flexShrink:0 }}>
                  {i===0?"🥇":i===1?"🥈":i===2?"🥉":p.initials}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"11px", fontWeight:"600", color:"#1e1b4b" }}>{p.name}</div>
                  <div style={{ fontSize:"9px", color:"#9ca3af" }}>{p.dept}</div>
                </div>
                <span style={{ fontSize:"12px", fontWeight:"800", color:"#10b981" }}>{p.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Activity + Announcements ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
          {/* Recent Activity */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <Activity size={15} color="#6b7280"/>
              <span style={{ fontSize:"13px", fontWeight:"700", color:"#1e1b4b" }}>Recent Activity</span>
              <button onClick={()=>navigate("/audit-log")} style={{ marginLeft:"auto", background:"none", border:"none", fontSize:"10px", color:"#6366f1", fontWeight:"600", cursor:"pointer" }}>View All →</button>
            </div>
            {recentActivity.map((a,i)=>(
              <div key={i} className="action-row" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 6px", borderBottom: i<recentActivity.length-1?"1px solid #f3f4f6":"none" }}>
                <div style={{ width:"32px", height:"32px", borderRadius:"9px", background:a.color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontWeight:"700", flexShrink:0 }}>{a.initials}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"11px", color:"#374151" }}>{a.text}</div>
                  <div style={{ fontSize:"9px", color:"#d1d5db", marginTop:"2px" }}>{a.time} · {a.by}</div>
                </div>
                <Badge bg={a.bc} color={a.tc}>{a.badge}</Badge>
              </div>
            ))}
          </div>

          {/* Announcements */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <Megaphone size={15} color="#f59e0b"/>
              <span style={{ fontSize:"13px", fontWeight:"700", color:"#1e1b4b" }}>Announcements</span>
            </div>
            {announcements.map((a,i)=>(
              <div key={i} style={{ padding:"11px 0", borderBottom: i<announcements.length-1?"1px solid #f3f4f6":"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", gap:"8px" }}>
                  <span style={{ fontSize:"12px", fontWeight:"600", color:"#1e1b4b" }}>{a.title}</span>
                  <span style={{ fontSize:"9px", color:"#d1d5db", whiteSpace:"nowrap" }}>{a.date}</span>
                </div>
                <p style={{ fontSize:"10px", color:"#9ca3af", marginTop:"4px", lineHeight:1.5 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Calendar (small) + Birthdays (big) ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 420px", gap:"16px" }}>

          {/* Calendar — compact */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"12px" }}>
              <CalendarDays size={15} color="#6366f1"/>
              <span style={{ fontSize:"13px", fontWeight:"700", color:"#1e1b4b" }}>Calendar — Events</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
              <button onClick={()=>{ if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1); }}
                style={{ background:"#f3f4f6", border:"none", borderRadius:"7px", padding:"4px 10px", cursor:"pointer", fontSize:"11px" }}>←</button>
              <span style={{ fontSize:"12px", fontWeight:"700", color:"#1e1b4b" }}>{monthNames[calMonth]} {calYear}</span>
              <button onClick={()=>{ if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1); }}
                style={{ background:"#f3f4f6", border:"none", borderRadius:"7px", padding:"4px 10px", cursor:"pointer", fontSize:"11px" }}>→</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px", textAlign:"center" }}>
              {["S","M","T","W","T","F","S"].map((d,i)=>(
                <div key={i} style={{ fontSize:"8px", fontWeight:"700", color:"#d1d5db", padding:"4px" }}>{d}</div>
              ))}
              {Array.from({length:firstDayOfWeek}).map((_,i)=><div key={`e${i}`}/>)}
              {Array.from({length:daysInMonth},(_,i)=>i+1).map(day=>{
                const evts = calendarEvents[day]||[];
                const isToday = day===new Date().getDate() && calMonth===new Date().getMonth();
                const hasBirthday = evts.some(e=>e.type==="birthday");
                return (
                  <div key={day} className="cal-day"
                    style={{ padding:"4px 2px", borderRadius:"6px", background: isToday?"#6366f1": hasBirthday?"#fdf2f8":"transparent", fontSize:"9px", fontWeight: isToday?700:400, color: isToday?"#fff":"#374151", transition:"background 0.15s" }}>
                    {day}
                    {evts.slice(0,1).map((e,ei)=><div key={ei} style={{ fontSize:"7px", marginTop:"1px" }}>{e.type==="birthday"?"🎂":"📌"}</div>)}
                  </div>
                );
              })}
            </div>
            <div style={{ display:"flex", gap:"10px", marginTop:"10px", padding:"6px 8px", background:"#f9fafb", borderRadius:"8px", fontSize:"8px", color:"#9ca3af" }}>
              <span>🎂 Birthday</span><span>🌿 Holiday</span><span>⚠️ Emergency</span>
            </div>
          </div>

          {/* Birthdays — big */}
          <div style={card} className="white-card">
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"14px" }}>
              <Cake size={16} color="#ec4899"/>
              <span style={{ fontSize:"14px", fontWeight:"700", color:"#1e1b4b" }}>Upcoming Birthdays</span>
              <span style={{ marginLeft:"auto", background:"#fdf2f8", color:"#ec4899", padding:"3px 10px", borderRadius:"20px", fontSize:"10px", fontWeight:"700" }}>
                {upcomingBirthdays.length} this month
              </span>
            </div>

            {upcomingBirthdays.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px 20px" }}>
                <div style={{ fontSize:"32px" }}>🎉</div>
                <div style={{ fontSize:"12px", color:"#9ca3af", marginTop:"8px" }}>No birthdays in next 30 days</div>
              </div>
            ) : (
              <div style={{ maxHeight:"360px", overflowY:"auto", paddingRight:"4px" }}>
                {upcomingBirthdays.map((b,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"11px 0", borderBottom: i<upcomingBirthdays.length-1?"1px solid #f3f4f6":"none" }}>
                    {/* Avatar */}
                    <div style={{ width:"40px", height:"40px", borderRadius:"12px", background: b.daysUntil===0?"linear-gradient(135deg,#ec4899,#fbcfe8)":"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize: b.daysUntil===0?"20px":"12px", fontWeight:"700", flexShrink:0 }}>
                      {b.daysUntil===0?"🎂":b.initials}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:"12px", fontWeight:"700", color:"#1e1b4b" }}>{b.name}</div>
                      <div style={{ fontSize:"10px", color:"#9ca3af", marginTop:"2px" }}>
                        {b.dept} &nbsp;·&nbsp; {b.date.toLocaleDateString("en-PK",{month:"short",day:"numeric"})}
                      </div>
                    </div>
                    {/* Days badge */}
                    <div style={{ textAlign:"center" }}>
                      <div style={{ background: b.daysUntil===0?"#ec4899": b.daysUntil<=3?"#f59e0b":"#eff6ff", color: b.daysUntil<=3?"#fff":"#6366f1", padding:"4px 12px", borderRadius:"20px", fontSize:"10px", fontWeight:"700" }}>
                        {b.daysUntil===0?"🎊 Today": b.daysUntil===1?"Tomorrow":`${b.daysUntil} days`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}