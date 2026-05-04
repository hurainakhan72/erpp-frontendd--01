import { useState, useEffect } from "react";

interface Employee {
  id: string; name: string; designation: string; department: string;
  doj: string; payMode: string;
  salary: { basic: number; rent: number; med: number; conv: number; comm: number };
}
interface PayRecord {
  empId: string; name: string; dept: string; designation: string;
  doj: string; payMode: string;
  month: number; year: number;
  workingDays: number; paidDays: number; absents: number;
  cl: number; ml: number; al: number;
  basic: number; rent: number; med: number; conv: number; comm: number; ot: number;
  absDed: number; tax: number; eobi: number; advance: number; loan: number; other: number;
  gross: number; ded: number; net: number;
  status: "Draft" | "Finalized";
}

const MONTHS = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
const monthDays = (m: number, y: number) => {
  if (m === 2) return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 29 : 28;
  return [0,31,28,31,30,31,30,31,31,30,31,30,31][m];
};
const EMPLOYEES: Employee[] = [
  { id:"EMP001", name:"Ahmed Raza",     designation:"Senior Developer",  department:"Engineering",     doj:"Jan 15, 2020", payMode:"Online Transfer", salary:{basic:150000,rent:30000,med:10000,conv:5000,comm:0} },
  { id:"EMP002", name:"Sara Khan",      designation:"HR Manager",         department:"Human Resources", doj:"Mar 1, 2019",  payMode:"Bank Transfer",   salary:{basic:120000,rent:24000,med:8000, conv:4000,comm:0} },
  { id:"EMP003", name:"Bilal Siddiqui", designation:"Sales Executive",    department:"Sales",           doj:"Jun 10, 2021", payMode:"Online Transfer", salary:{basic:80000, rent:16000,med:5000, conv:3000,comm:15000} },
  { id:"EMP004", name:"Nadia Malik",    designation:"Finance Analyst",    department:"Finance",         doj:"Sep 5, 2018",  payMode:"Cash",            salary:{basic:100000,rent:20000,med:7000, conv:3500,comm:0} },
  { id:"EMP005", name:"Usman Tariq",    designation:"Project Manager",    department:"Operations",      doj:"Feb 20, 2022", payMode:"Online Transfer", salary:{basic:180000,rent:36000,med:12000,conv:6000,comm:0} },
  { id:"EMP006", name:"Zainab Ali",     designation:"UI/UX Designer",     department:"Engineering",     doj:"Apr 1, 2023",  payMode:"Online Transfer", salary:{basic:95000, rent:19000,med:6500, conv:3000,comm:0} },
];

const AV_COLORS = ["#6366f1","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#3b82f6","#8b5cf6"];
const avatarBg = (n: string) => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
const initials  = (n: string) => n.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
const pkr      = (n: number) => "PKR " + Math.round(n).toLocaleString("en-PK");
const pkrShort = (n: number) => {
  n = Math.round(n);
  if (n >= 10000000) return "PKR "+(n/10000000).toFixed(2)+" Cr";
  if (n >= 100000)   return "PKR "+(n/100000).toFixed(2)+" L";
  return "PKR "+n.toLocaleString("en-PK");
};

function numWords(n: number): string {
  if (n===0) return "Zero";
  const o=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const t=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  if(n<20) return o[n];
  if(n<100) return t[Math.floor(n/10)]+(n%10?" "+o[n%10]:"");
  if(n<1000) return o[Math.floor(n/100)]+" Hundred"+(n%100?" and "+numWords(n%100):"");
  if(n<100000) return numWords(Math.floor(n/1000))+" Thousand"+(n%1000?" "+numWords(n%1000):"");
  if(n<10000000) return numWords(Math.floor(n/100000))+" Lakh"+(n%100000?" "+numWords(n%100000):"");
  return numWords(Math.floor(n/10000000))+" Crore"+(n%10000000?" "+numWords(n%10000000):"");
}

const CARD_THEMES = [
  { bg:"linear-gradient(135deg,#f97316,#ef4444)", shadow:"0 8px 24px rgba(249,115,22,.4)",  icon:"💰", label:"Net Payable" },
  { bg:"linear-gradient(135deg,#06b6d4,#3b82f6)", shadow:"0 8px 24px rgba(6,182,212,.35)",  icon:"📊", label:"Total Gross" },
  { bg:"linear-gradient(135deg,#f59e0b,#f97316)", shadow:"0 8px 24px rgba(245,158,11,.4)",  icon:"📄", label:"Draft Records" },
  { bg:"linear-gradient(135deg,#10b981,#06b6d4)", shadow:"0 8px 24px rgba(16,185,129,.35)", icon:"🔒", label:"Finalized" },
];

function Toast({ msg, show }: { msg:string; show:boolean }) {
  return (
    <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,
      background:"linear-gradient(135deg,#f97316,#ef4444)",color:"#fff",
      padding:"12px 22px",borderRadius:12,fontSize:13,fontWeight:600,
      boxShadow:"0 8px 28px rgba(249,115,22,.35)",
      opacity:show?1:0,transform:show?"translateY(0)":"translateY(10px)",
      transition:"all .3s",pointerEvents:"none"}}>{msg}</div>
  );
}

// shared input styles for modal (light)
const MI: React.CSSProperties = {height:33,border:"1px solid #e5e7eb",borderRadius:8,padding:"0 10px",fontSize:12,color:"#111827",background:"#f9fafb",fontFamily:"'DM Mono',monospace",outline:"none",width:"100%"};
const MS: React.CSSProperties = {...MI,fontFamily:"'DM Sans',sans-serif",cursor:"pointer"};

// icon button
const IB = (c:string): React.CSSProperties => ({width:30,height:30,borderRadius:8,border:`1.5px solid ${c}44`,background:`${c}12`,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",color:c,transition:"opacity .15s"});

// section label in modal
function Sec({label,color}:{label:string;color:string}) {
  return (
    <div style={{fontSize:10,fontWeight:700,color,textTransform:"uppercase",letterSpacing:".08em",padding:"10px 0 8px",borderTop:"1px solid #f3f4f6",marginTop:4,display:"flex",alignItems:"center",gap:6}}>
      <span style={{width:3,height:12,borderRadius:2,background:color,display:"inline-block"}}/>
      {label}
    </div>
  );
}

export default function Payroll() {
  const [records,  setRecords]  = useState<PayRecord[]>([]);
  const [fMonth,   setFMonth]   = useState(3);
  const [fYear,    setFYear]    = useState(2026);
  const [fStatus,  setFStatus]  = useState("");
  const [fDept,    setFDept]    = useState("");
  const [fSearch,  setFSearch]  = useState("");
  const [showGen,  setShowGen]  = useState(false);
  const [showSlip, setShowSlip] = useState<PayRecord|null>(null);
  const [toast,    setToast]    = useState({show:false,msg:""});

  const [gEmp,   setGEmp]   = useState("EMP001");
  const [gMonth, setGMonth] = useState(3);
  const [gYear,  setGYear]  = useState(2026);
  const [gPaid,  setGPaid]  = useState(31);
  const [gAbs,   setGAbs]   = useState(0);
  const [gCL,    setGCL]    = useState(0);
  const [gML,    setGML]    = useState(0);
  const [gAL,    setGAL]    = useState(0);
  const [gBasic, setGBasic] = useState(150000);
  const [gRent,  setGRent]  = useState(30000);
  const [gMed,   setGMed]   = useState(10000);
  const [gConv,  setGConv]  = useState(5000);
  const [gComm,  setGComm]  = useState(0);
  const [gOT,    setGOT]    = useState(0);
  const [gTax,   setGTax]   = useState(12000);
  const [gEOBI,  setGEOBI]  = useState(370);
  const [gAdv,   setGAdv]   = useState(0);
  const [gLoan,  setGLoan]  = useState(0);
  const [gOther, setGOther] = useState(0);

  const totalDays  = monthDays(gMonth,gYear);
  const absDed     = gAbs>0 ? (gBasic/totalDays)*gAbs : 0;
  const earnings   = gBasic+gRent+gMed+gConv+gComm+gOT;
  const deductions = absDed+gTax+gEOBI+gAdv+gLoan+gOther;
  const netSalary  = earnings-deductions;

  function showT(msg:string){setToast({show:true,msg});setTimeout(()=>setToast({show:false,msg:""}),3000);}
  function loadEmp(id:string){
    const e=EMPLOYEES.find(x=>x.id===id); if(!e) return;
    setGBasic(e.salary.basic);setGRent(e.salary.rent);setGMed(e.salary.med);
    setGConv(e.salary.conv);setGComm(e.salary.comm);setGOT(0);
    setGAdv(0);setGLoan(0);setGOther(0);
  }
  useEffect(()=>{loadEmp(gEmp);},[gEmp]);
  useEffect(()=>{setGPaid(monthDays(gMonth,gYear));},[gMonth,gYear]);

  function openGen(){
    setGMonth(fMonth);setGYear(fYear);setGEmp("EMP001");
    setGAbs(0);setGCL(0);setGML(0);setGAL(0);
    setGTax(12000);setGEOBI(370);setGAdv(0);setGLoan(0);setGOther(0);
    loadEmp("EMP001");setShowGen(true);
  }

  function savePayroll(status:"Draft"|"Finalized"){
    const emp=EMPLOYEES.find(e=>e.id===gEmp)!;
    const rec:PayRecord={
      empId:gEmp,name:emp.name,dept:emp.department,designation:emp.designation,
      doj:emp.doj,payMode:emp.payMode,month:gMonth,year:gYear,
      workingDays:totalDays,paidDays:gPaid,absents:gAbs,
      cl:gCL,ml:gML,al:gAL,
      basic:gBasic,rent:gRent,med:gMed,conv:gConv,comm:gComm,ot:gOT,
      absDed:Math.round(absDed),tax:gTax,eobi:gEOBI,
      advance:gAdv,loan:gLoan,other:gOther,
      gross:Math.round(earnings),ded:Math.round(deductions),net:Math.round(netSalary),
      status
    };
    setRecords(prev=>{
      const i=prev.findIndex(r=>r.empId===gEmp&&r.month===gMonth&&r.year===gYear);
      if(i>=0){const n=[...prev];n[i]=rec;return n;}
      return [...prev,rec];
    });
    setShowGen(false);
    showT(status==="Draft"?"📄 Saved as Draft":"✅ Payroll Finalized & Locked");
  }

  function finalizeRecord(empId:string,month:number,year:number){
    setRecords(p=>p.map(r=>r.empId===empId&&r.month===month&&r.year===year?{...r,status:"Finalized"}:r));
    showT("✅ Payroll Finalized");
  }
  function deleteRecord(empId:string,month:number,year:number){
    if(!window.confirm("Delete this payroll record?")) return;
    setRecords(p=>p.filter(r=>!(r.empId===empId&&r.month===month&&r.year===year)));
    showT("🗑 Record deleted");
  }

  const allMonth  = records.filter(r=>r.month===fMonth&&r.year===fYear);
  const filtered  = allMonth.filter(r=>{
    if(fStatus&&r.status!==fStatus) return false;
    if(fDept&&r.dept!==fDept) return false;
    if(fSearch&&!r.name.toLowerCase().includes(fSearch.toLowerCase())&&!r.empId.toLowerCase().includes(fSearch.toLowerCase())) return false;
    return true;
  });

  const netTotal   = filtered.reduce((s,r)=>s+r.net,0);
  const grossTotal = filtered.reduce((s,r)=>s+r.gross,0);
  const draftList  = allMonth.filter(r=>r.status==="Draft");
  const finalList  = allMonth.filter(r=>r.status==="Finalized");
  const years      = Array.from({length:36},(_,i)=>2000+i);

  const cardStats=[
    {val:pkrShort(netTotal),       sub:filtered.length+" employees this period",pct:filtered.length>0?80:0},
    {val:pkrShort(grossTotal),     sub:"Before all deductions",pct:grossTotal>0?70:0},
    {val:String(draftList.length), sub:draftList.length>0?pkrShort(draftList.reduce((s,r)=>s+r.net,0))+" pending":"No drafts",pct:allMonth.length>0?Math.round(draftList.length/Math.max(allMonth.length,1)*100):0},
    {val:String(finalList.length), sub:finalList.length>0?pkrShort(finalList.reduce((s,r)=>s+r.net,0))+" locked":"None yet",pct:allMonth.length>0?Math.round(finalList.length/Math.max(allMonth.length,1)*100):0},
  ];

  // ── light select style for filter bar ──
  const FS: React.CSSProperties = {height:34,border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",color:"#374151",fontSize:12,padding:"0 10px",outline:"none",fontFamily:"'DM Sans',sans-serif"};

  // ── Payslip modal (all light) ──
  function SlipModal({r}:{r:PayRecord}){
    const slipNo=records.findIndex(x=>x.empId===r.empId&&x.month===r.month&&x.year===r.year)+1;
    const SR:React.CSSProperties={display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 16px",borderBottom:"1px solid #f3f4f6",fontSize:12};
    return(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(3px)"}} onClick={()=>setShowSlip(null)}>
        <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:760,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,.18)"}} onClick={e=>e.stopPropagation()}>
          <div style={{padding:"14px 20px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#fff",zIndex:2}}>
            <div style={{fontWeight:700,fontSize:15,color:"#111827"}}>Pay Slip</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>window.print()} style={{height:32,borderRadius:8,border:"1px solid #e5e7eb",background:"#f9fafb",fontSize:12,padding:"0 12px",cursor:"pointer",color:"#374151",display:"inline-flex",alignItems:"center",gap:5}}>🖨 Print</button>
              <button onClick={()=>setShowSlip(null)} style={{height:32,borderRadius:8,border:"1px solid #e5e7eb",background:"#f9fafb",fontSize:12,padding:"0 12px",cursor:"pointer",color:"#374151"}}>✕ Close</button>
            </div>
          </div>
          <div style={{padding:20}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:44,height:44,borderRadius:12,background:avatarBg(r.name),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:14}}>{initials(r.name)}</div>
              <div><div style={{fontWeight:700,fontSize:16,color:"#111827"}}>{r.name}</div><div style={{fontSize:11,color:"#6b7280"}}>{r.designation} · {r.dept}</div></div>
              <div style={{marginLeft:"auto"}}>{r.status==="Draft"?<span style={{padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:"#fef3c7",color:"#d97706"}}>⬤ Draft</span>:<span style={{padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:"#d1fae5",color:"#059669"}}>⬤ Finalized</span>}</div>
            </div>
            <div style={{border:"1px solid #e5e7eb",borderRadius:12,overflow:"hidden"}}>
              <div style={{background:"linear-gradient(135deg,#f97316,#ef4444)",color:"#fff",padding:"14px 18px",textAlign:"center"}}>
                <div style={{fontSize:15,fontWeight:700,letterSpacing:".05em"}}>PAYROLL SLIP</div>
                <div style={{fontSize:11,opacity:.85,marginTop:2}}>{MONTHS[r.month].toUpperCase()} {r.year}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:"#f97316",background:"#fff7ed",padding:"7px 16px",borderBottom:"1px solid #f3f4f6",textTransform:"uppercase",letterSpacing:".06em"}}>Employee Details</div>
                  {[["Employee Code",r.empId],["Full Name",r.name],["Designation",r.designation],["Department",r.dept],["Date of Joining",r.doj],["Payment Mode",r.payMode]].map(([k,v])=>(
                    <div key={k} style={SR}><span style={{color:"#6b7280"}}>{k}</span><span style={{fontFamily:"'DM Mono',monospace",fontWeight:500,color:"#111827"}}>{v}</span></div>
                  ))}
                </div>
                <div style={{borderLeft:"1px solid #f3f4f6"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#f97316",background:"#fff7ed",padding:"7px 16px",borderBottom:"1px solid #f3f4f6",textTransform:"uppercase",letterSpacing:".06em"}}>Slip Information</div>
                  {[["Slip No.",String(slipNo).padStart(3,"0")],["Month",MONTHS[r.month]],["Year",String(r.year)],["Working Days",String(r.workingDays)],["Paid Days",String(r.paidDays)],["Absents",String(r.absents)]].map(([k,v])=>(
                    <div key={k} style={SR}><span style={{color:"#6b7280"}}>{k}</span><span style={{fontFamily:"'DM Mono',monospace",fontWeight:500,color:"#111827"}}>{v}</span></div>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:"#3b82f6",background:"#eff6ff",padding:"7px 16px",borderBottom:"1px solid #f3f4f6",textTransform:"uppercase",letterSpacing:".06em"}}>Earnings</div>
                  {[["Basic Salary",pkr(r.basic)],["House Rent",pkr(r.rent)],["Medical",pkr(r.med)],["Conveyance",pkr(r.conv)],["Commission",pkr(r.comm)],["Overtime",pkr(r.ot||0)]].map(([k,v])=>(
                    <div key={k} style={SR}><span style={{color:"#6b7280"}}>{k}</span><span style={{fontFamily:"'DM Mono',monospace",color:"#2563eb"}}>{v}</span></div>
                  ))}
                  <div style={{...SR,background:"#eff6ff",fontWeight:700}}><span style={{color:"#111827"}}>Gross Total</span><span style={{fontFamily:"'DM Mono',monospace",color:"#2563eb",fontSize:14}}>{pkr(r.gross)}</span></div>
                </div>
                <div style={{borderLeft:"1px solid #f3f4f6"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#ef4444",background:"#fef2f2",padding:"7px 16px",borderBottom:"1px solid #f3f4f6",textTransform:"uppercase",letterSpacing:".06em"}}>Deductions</div>
                  {[["Absent Deduction",pkr(r.absDed)],["Income Tax",pkr(r.tax)],["EOBI",pkr(r.eobi||0)],["Advance",pkr(r.advance)],["Loan",pkr(r.loan)],["Other",pkr(r.other)]].map(([k,v])=>(
                    <div key={k} style={SR}><span style={{color:"#6b7280"}}>{k}</span><span style={{fontFamily:"'DM Mono',monospace",color:"#ef4444"}}>{v}</span></div>
                  ))}
                  <div style={{...SR,background:"#fef2f2",fontWeight:700}}><span style={{color:"#111827"}}>Total Deductions</span><span style={{fontFamily:"'DM Mono',monospace",color:"#ef4444",fontSize:14}}>{pkr(r.ded)}</span></div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:"linear-gradient(135deg,#fff7ed,#fef2f2)"}}>
                <div><div style={{fontSize:11,color:"#6b7280",marginBottom:4}}>NET SALARY</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:26,fontWeight:700,color:"#f97316"}}>{pkr(r.net)}</div></div>
                <div style={{textAlign:"right",fontSize:11,color:"#9ca3af",maxWidth:240,fontStyle:"italic"}}>{numWords(r.net)} Rupees Only</div>
              </div>
              <div style={{display:"flex",justifyContent:"space-around",padding:"22px 20px 16px",borderTop:"1px solid #f3f4f6"}}>
                {["Prepared By","Employee Signature","Authorized By"].map(l=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{width:110,borderBottom:"1px solid #d1d5db",margin:"0 auto 8px"}}/>
                    <div style={{fontSize:10,color:"#9ca3af"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#f1f5f9}
        .pc:hover{transform:translateY(-4px)!important}
        .pr:hover td{background:#f8fafc!important}
        .pi:hover{opacity:.75!important}
        .pb:hover{opacity:.9;transform:translateY(-1px)}
        select option{background:#fff;color:#111}
        input[type=number]::-webkit-inner-spin-button{opacity:.4}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
      `}</style>

      <div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"'DM Sans',system-ui,sans-serif",padding:"28px 32px"}}>

        {/* ── Topbar ── */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:26,fontWeight:700,color:"#111827",letterSpacing:"-.5px"}}>Payroll</div>
            <div style={{fontSize:12,color:"#6b7280",marginTop:4}}>
              Manage salaries &amp; payslips &nbsp;·&nbsp;
              <span style={{color:"#f97316",fontWeight:600}}>{MONTHS[fMonth]} {fYear}</span>
            </div>
          </div>
          <button className="pb" onClick={openGen} style={{height:40,borderRadius:10,border:"none",background:"linear-gradient(135deg,#f97316,#ef4444)",color:"#fff",fontSize:13,fontWeight:600,padding:"0 20px",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:7,boxShadow:"0 4px 16px rgba(249,115,22,.4)",transition:"all .15s"}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Generate Payroll
          </button>
        </div>

        {/* ── Colorful Stat Cards ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
          {CARD_THEMES.map((th,i)=>(
            <div key={th.label} className="pc" style={{background:th.bg,borderRadius:18,padding:"20px 22px",boxShadow:th.shadow,transition:"transform .2s",position:"relative",overflow:"hidden",color:"#fff"}}>
              <div style={{position:"absolute",right:-18,top:-18,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,.15)"}}/>
              <div style={{position:"absolute",right:14,bottom:-14,width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,.1)"}}/>
              <div style={{fontSize:22,marginBottom:10,position:"relative"}}>{th.icon}</div>
              <div style={{fontSize:10,fontWeight:600,letterSpacing:".07em",textTransform:"uppercase",opacity:.8,marginBottom:6}}>{th.label}</div>
              <div style={{fontSize:i<2?20:30,fontWeight:700,fontFamily:"'DM Mono',monospace",lineHeight:1.1,marginBottom:4}}>{cardStats[i].val}</div>
              <div style={{fontSize:11,opacity:.75,marginTop:6}}>{cardStats[i].sub}</div>
              <div style={{height:3,borderRadius:3,background:"rgba(255,255,255,.25)",overflow:"hidden",marginTop:14}}>
                <div style={{height:"100%",borderRadius:3,background:"rgba(255,255,255,.7)",width:`${cardStats[i].pct}%`,transition:"width .6s ease"}}/>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter Bar ── */}
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          <select style={FS} value={fMonth} onChange={e=>setFMonth(+e.target.value)}>
            {MONTHS.slice(1).map((m,i)=><option key={i+1} value={i+1}>{m}</option>)}
          </select>
          <select style={FS} value={fYear} onChange={e=>setFYear(+e.target.value)}>
            {years.map(y=><option key={y} value={y}>{y}</option>)}
          </select>
          <select style={FS} value={fStatus} onChange={e=>setFStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option>Draft</option>
            <option>Finalized</option>
          </select>
          <select style={FS} value={fDept} onChange={e=>setFDept(e.target.value)}>
            <option value="">All Departments</option>
            {["Engineering","Human Resources","Sales","Finance","Operations"].map(d=><option key={d}>{d}</option>)}
          </select>
          <input type="text" placeholder="Search name or ID…" value={fSearch} onChange={e=>setFSearch(e.target.value)}
            style={{flex:1,minWidth:160,height:34,border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",color:"#374151",fontSize:12,padding:"0 12px",outline:"none"}}/>
          <span style={{marginLeft:"auto",fontSize:11,color:"#9ca3af",whiteSpace:"nowrap"}}>
            Showing <b style={{color:"#374151"}}>{filtered.length}</b> record{filtered.length!==1?"s":""}
          </span>
        </div>

        {/* ── Table ── */}
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:16,overflow:"auto",boxShadow:"0 1px 8px rgba(0,0,0,.05)"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:920}}>
            <thead>
              <tr style={{background:"#f8fafc"}}>
                {["Employee","Emp ID","Working Days","Paid Days","Gross Salary","Deductions","Net Salary","Status","Actions"].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"11px 16px",fontSize:10,fontWeight:600,color:"#9ca3af",borderBottom:"1px solid #e5e7eb",whiteSpace:"nowrap",letterSpacing:".05em",textTransform:"uppercase"}}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0?(
                <tr><td colSpan={9} style={{textAlign:"center",padding:"72px 20px",color:"#9ca3af"}}>
                  <div style={{fontSize:40,marginBottom:12}}>📋</div>
                  <div style={{fontWeight:600,color:"#374151",marginBottom:6,fontSize:15}}>No payroll records found</div>
                  <div style={{fontSize:12}}>Click "+ Generate Payroll" to create records for this period</div>
                </td></tr>
              ):filtered.map(r=>(
                <tr key={r.empId+r.month+r.year} className="pr">
                  {/* Employee */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:36,height:36,borderRadius:10,background:avatarBg(r.name),display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12,flexShrink:0}}>{initials(r.name)}</div>
                      <div>
                        <div style={{fontWeight:600,color:"#111827",fontSize:13}}>{r.name}</div>
                        <div style={{fontSize:10,color:"#9ca3af",marginTop:1}}>{r.payMode}</div>
                      </div>
                    </div>
                  </td>
                  {/* Emp ID */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle"}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,background:"#f3f4f6",padding:"3px 8px",borderRadius:6,color:"#6b7280",border:"1px solid #e5e7eb"}}>{r.empId}</span>
                  </td>
                  {/* Working Days */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle",fontFamily:"'DM Mono',monospace",fontSize:13,color:"#374151"}}>{r.workingDays}</td>
                  {/* Paid Days */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle",fontFamily:"'DM Mono',monospace",fontSize:13,color:"#374151"}}>{r.paidDays}</td>
                  {/* Gross */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle"}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#2563eb",fontWeight:500}}>{pkr(r.gross)}</span>
                  </td>
                  {/* Deductions */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle"}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#ef4444",fontWeight:500}}>↘ {pkr(r.ded)}</span>
                  </td>
                  {/* Net */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle"}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#10b981",fontWeight:700}}>↗ {pkr(r.net)}</span>
                  </td>
                  {/* Status */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle"}}>
                    {r.status==="Draft"
                      ?<span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:"#fef3c7",color:"#d97706",display:"inline-block"}}>Draft</span>
                      :<span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:"#d1fae5",color:"#059669",display:"inline-block"}}>Finalized</span>}
                  </td>
                  {/* Actions */}
                  <td style={{padding:"12px 16px",borderBottom:"1px solid #f3f4f6",verticalAlign:"middle"}}>
                    <div style={{display:"flex",gap:6}}>
                      <button className="pi" style={IB("#6366f1")} title="View Payslip" onClick={()=>setShowSlip(r)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      {r.status==="Draft"&&(
                        <button className="pi" style={IB("#10b981")} title="Finalize" onClick={()=>finalizeRecord(r.empId,r.month,r.year)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </button>
                      )}
                      <button className="pi" style={IB("#ef4444")} title="Delete" onClick={()=>deleteRecord(r.empId,r.month,r.year)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ Generate Modal ══ */}
      {showGen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(3px)"}} onClick={()=>setShowGen(false)}>
          <div style={{background:"#fff",borderRadius:18,width:"100%",maxWidth:720,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,.18)"}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:"16px 22px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#fff",zIndex:2}}>
              <div style={{fontWeight:700,fontSize:15,color:"#111827"}}>⚙️ Generate Payroll</div>
              <button style={{height:30,borderRadius:7,border:"1px solid #e5e7eb",background:"#f9fafb",fontSize:12,padding:"0 12px",cursor:"pointer",color:"#374151"}} onClick={()=>setShowGen(false)}>✕ Close</button>
            </div>
            <div style={{padding:22}}>
              {/* Emp + Period */}
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
                <div style={{display:"flex",flexDirection:"column",gap:4,flex:2,minWidth:200}}>
                  <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>Employee</label>
                  <select style={MS} value={gEmp} onChange={e=>{setGEmp(e.target.value);loadEmp(e.target.value)}}>
                    {EMPLOYEES.map(e=><option key={e.id} value={e.id}>{e.id} — {e.name}</option>)}
                  </select>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                  <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>Month</label>
                  <select style={MS} value={gMonth} onChange={e=>setGMonth(+e.target.value)}>
                    {MONTHS.slice(1).map((m,i)=><option key={i+1} value={i+1}>{m}</option>)}
                  </select>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:90}}>
                  <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>Year</label>
                  <select style={MS} value={gYear} onChange={e=>setGYear(+e.target.value)}>
                    {years.map(y=><option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Attendance */}
              <Sec label="Attendance" color="#f97316"/>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
                {[["Total Days",String(totalDays),true],["Paid Days",String(gPaid),false],["Absents",String(gAbs),false]].map(([l,v,dis])=>(
                  <div key={String(l)} style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                    <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>{l}</label>
                    <input style={{...MI,opacity:dis?"0.55":"1",background:dis?"#f3f4f6":"#f9fafb"}} type="number" value={v} disabled={!!dis}
                      onChange={e=>{ if(l==="Paid Days") setGPaid(+e.target.value); if(l==="Absents") setGAbs(+e.target.value); }}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
                {[["Casual Leave",gCL,setGCL],["Medical Leave",gML,setGML],["Annual Leave",gAL,setGAL]].map(([l,v,set])=>(
                  <div key={String(l)} style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                    <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>{l}</label>
                    <input style={MI} type="number" value={String(v)} onChange={e=>(set as(n:number)=>void)(+e.target.value)}/>
                  </div>
                ))}
              </div>

              {/* Earnings */}
              <Sec label="Earnings" color="#3b82f6"/>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
                {[["Basic Salary",gBasic,setGBasic],["House Rent",gRent,setGRent],["Medical Allow.",gMed,setGMed]].map(([l,v,set])=>(
                  <div key={String(l)} style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                    <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>{l}</label>
                    <input style={MI} type="number" value={String(v)} onChange={e=>(set as(n:number)=>void)(+e.target.value)}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:6}}>
                {[["Conveyance",gConv,setGConv],["Commission/Bonus",gComm,setGComm],["Overtime",gOT,setGOT]].map(([l,v,set])=>(
                  <div key={String(l)} style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                    <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>{l}</label>
                    <input style={MI} type="number" value={String(v)} onChange={e=>(set as(n:number)=>void)(+e.target.value)}/>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"right",fontSize:12,color:"#6b7280",marginBottom:2}}>
                Total Earnings: <span style={{fontFamily:"'DM Mono',monospace",color:"#2563eb",fontSize:14,fontWeight:700}}>{pkr(earnings)}</span>
              </div>

              {/* Deductions */}
              <Sec label="Deductions" color="#ef4444"/>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:10}}>
                <div style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                  <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>Absent Deduction (auto)</label>
                  <input style={{...MI,background:"#fffbeb",color:"#d97706"}} value={pkr(Math.round(absDed))} disabled/>
                </div>
                {[["Income Tax",gTax,setGTax],["EOBI",gEOBI,setGEOBI]].map(([l,v,set])=>(
                  <div key={String(l)} style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                    <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>{l}</label>
                    <input style={MI} type="number" value={String(v)} onChange={e=>(set as(n:number)=>void)(+e.target.value)}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:6}}>
                {[["Advance",gAdv,setGAdv],["Loan Installment",gLoan,setGLoan],["Other",gOther,setGOther]].map(([l,v,set])=>(
                  <div key={String(l)} style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:110}}>
                    <label style={{fontSize:11,color:"#6b7280",fontWeight:500}}>{l}</label>
                    <input style={MI} type="number" value={String(v)} onChange={e=>(set as(n:number)=>void)(+e.target.value)}/>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"right",fontSize:12,color:"#6b7280",marginBottom:2}}>
                Total Deductions: <span style={{fontFamily:"'DM Mono',monospace",color:"#ef4444",fontSize:14,fontWeight:700}}>{pkr(deductions)}</span>
              </div>

              {/* Summary */}
              <div style={{background:"#f8fafc",border:"1px solid #e5e7eb",borderRadius:12,padding:"14px 18px",marginTop:14}}>
                <div style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12,color:"#6b7280"}}><span>Gross Salary</span><span style={{fontFamily:"'DM Mono',monospace",color:"#2563eb",fontWeight:600}}>{pkr(earnings)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12,color:"#6b7280"}}><span>Total Deductions</span><span style={{fontFamily:"'DM Mono',monospace",color:"#ef4444",fontWeight:600}}>{pkr(deductions)}</span></div>
                <div style={{borderTop:"1px solid #e5e7eb",margin:"8px 0"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:14,fontWeight:700,color:"#111827"}}>NET SALARY</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:24,fontWeight:700,color:"#f97316"}}>{pkr(netSalary)}</span>
                </div>
                <div style={{fontSize:11,color:"#9ca3af",fontStyle:"italic",marginTop:10,paddingTop:8,borderTop:"1px solid #f3f4f6"}}>
                  {numWords(Math.max(0,Math.floor(netSalary)))} Rupees Only
                </div>
              </div>
            </div>
            <div style={{padding:"14px 22px",borderTop:"1px solid #f3f4f6",display:"flex",justifyContent:"flex-end",gap:8,position:"sticky",bottom:0,background:"#fff"}}>
              <button style={{height:34,borderRadius:8,border:"1px solid #e5e7eb",background:"#f9fafb",fontSize:12,padding:"0 16px",cursor:"pointer",color:"#374151"}} onClick={()=>setShowGen(false)}>Cancel</button>
              <button style={{height:34,borderRadius:8,border:"1px solid #fcd34d",background:"#fffbeb",fontSize:12,padding:"0 16px",cursor:"pointer",color:"#d97706",fontWeight:600}} onClick={()=>savePayroll("Draft")}>📄 Save as Draft</button>
              <button className="pb" style={{height:34,borderRadius:8,border:"none",background:"linear-gradient(135deg,#f97316,#ef4444)",fontSize:12,padding:"0 18px",cursor:"pointer",color:"#fff",fontWeight:600,boxShadow:"0 3px 12px rgba(249,115,22,.35)",transition:"all .15s"}} onClick={()=>savePayroll("Finalized")}>✅ Finalize &amp; Lock</button>
            </div>
          </div>
        </div>
      )}

      {showSlip&&<SlipModal r={showSlip}/>}
      <Toast msg={toast.msg} show={toast.show}/>
    </>
  );
}