// Initial dashboard values transcribed from dashboard.png.
export const SNAPSHOT_DATE = "2026-11-02";

export const RECRUITMENT_PAGES = [
  { id: "recruitment", label: "Job Postings", href: "#/recruitment" },
  {
    id: "applicants",
    label: "Applications",
    href: "#/recruitment/applications",
  },
];

export const PAYROLL_PAGES = [
  { id: "payroll", label: "Payroll Overview", href: "#/payroll" },
  {
    id: "payroll-deductions",
    label: "Deductions",
    href: "#/payroll/deductions",
  },
  {
    id: "payroll-reports",
    label: "Payroll Reports",
    href: "#/payroll/reports",
  },
];
// Demo calculation schedule matching Payroll.png. The backend must supply the
// approved schedule effective for each payroll month before production use.
export const INITIAL_PAYROLL_POLICY = {
  incomeTaxStatus: "active",
  pensionStatus: "active",
  name: "Reference payroll schedule",
  pensionRate: 7,
  employerPensionRate: 11,
  taxBands: [
    { upTo: 600, rate: 0, offset: 0 },
    { upTo: 1650, rate: 10, offset: 60 },
    { upTo: 3200, rate: 15, offset: 142.5 },
    { upTo: 5250, rate: 20, offset: 302.5 },
    { upTo: 7800, rate: 25, offset: 565 },
    { upTo: 10900, rate: 30, offset: 955 },
    { upTo: null, rate: 35, offset: 1500 },
  ],
};
export const INITIAL_PAYROLL_DEDUCTIONS = [];
export const INITIAL_PAYROLL_MONTHLY_POLICIES = [];
export const PAYROLL_POLICY_DEDUCTIONS = {
  incomeTax: {
    id: "income-tax",
    name: "Income Tax",
    description: "Employee income tax",
    kind: "automatic",
    icon: "building",
  },
  pension: {
    id: "employee-pension",
    name: "Pension Contribution",
    description: "Employee pension contribution",
    kind: "percent",
    icon: "shield",
  },
};
// Historical October amounts and status transcribed from Payroll.png. They are
// independent of today's roster salaries; unknown audit dates remain null.
export const INITIAL_PAYROLL_RUNS = [
  {
    id: "PR-2026-10",
    month: "2026-10",
    status: "FORWARDED_TO_FINANCE",
    generatedAt: null,
    forwardedAt: null,
    preparedBy: "",
    history: [],
    policy: INITIAL_PAYROLL_POLICY,
    rows: [
      {
        employeeId: "HD-IT-001",
        employeeName: "Sisay Kebede",
        department: "Hadiya Science Information Technology",
        gross: 16500,
        incomeTax: 4275,
        pension: 1155,
        employerPension: 1815,
        otherDeductions: 0,
        net: 11070,
        deductionItems: [],
      },
      {
        employeeId: "Epy123",
        employeeName: "Besufekad Ermias",
        department: "Database & Cloud Administration",
        gross: 11200,
        incomeTax: 2420,
        pension: 784,
        employerPension: 1232,
        otherDeductions: 0,
        net: 7996,
        deductionItems: [],
      },
      {
        employeeId: "2121",
        employeeName: "Tsedeke Wondimu",
        department: "Cybersecurity & Quality Assurance",
        gross: 32000,
        incomeTax: 9700,
        pension: 2240,
        employerPension: 3520,
        otherDeductions: 0,
        net: 20060,
        deductionItems: [],
      },
      {
        employeeId: "5601",
        employeeName: "Tesfaye Alemayew",
        department: "Software Engineering",
        gross: 24000,
        incomeTax: 6900,
        pension: 1680,
        employerPension: 2640,
        otherDeductions: 0,
        net: 15420,
        deductionItems: [],
      },
      {
        employeeId: "T2323",
        employeeName: "Tedwodros Kifle",
        department: "Cybersecurity & Quality Assurance",
        gross: 11200,
        incomeTax: 2420,
        pension: 784,
        employerPension: 1232,
        otherDeductions: 0,
        net: 7996,
        deductionItems: [],
      },
    ],
  },
];
export const INITIAL_EMPLOYEES = [
  {
    id: "Epy123",
    name: "Besufekad Ermias",
    email: "babi",
    qualification: "Diploma",
    basicSalary: 11200,
    department: "Database & Cloud Administration",
    grade: "Grade II (Associate)",
    status: "Active",
    hiredDate: "2026-10-30",
  },
  {
    id: "T2323",
    name: "Tedwodros Kifle",
    email: "tiblet",
    qualification: "Bcs",
    basicSalary: 11200,
    department: "Cybersecurity & Quality Assurance",
    grade: "Grade II (Associate)",
    status: "Active",
    hiredDate: "2026-10-24",
  },
  {
    id: "5601",
    name: "Tesfaye Alemayew",
    email: "alemayeh150@gmail.com",
    qualification: "BCS",
    basicSalary: 24000,
    department: "Software Engineering",
    grade: "Grade IV",
    status: "Active",
    hiredDate: "2026-10-21",
  },
  {
    id: "2121",
    name: "Tsedeke Wondimu",
    email: "Tesfaye",
    qualification: "BCS",
    basicSalary: 24000,
    department: "Cybersecurity & Quality Assurance",
    grade: "Grade IV",
    status: "Active",
    hiredDate: "2026-10-22",
  },
  {
    id: "HD-IT-001",
    name: "Sisay Kebede",
    email: "emp001",
    qualification: "MSc in Computer Science",
    basicSalary: 16500,
    department: "Hadiya Science Information Technology",
    grade: "Grade III (Senior)",
    status: "Active",
    hiredDate: "2022-01-13",
  },
];

// Initial departments based on Department.png.
// Heads and descriptions stay empty until entered by the user.
export const INITIAL_DEPARTMENTS = [
  { id: 5, name: "Cybersecurity & Quality Assurance", code: "CQA" },
  { id: 4, name: "Database & Cloud Administration", code: "DCA" },
  { id: 1, name: "Hadiya Science Information Technology", code: "HSIT" },
  { id: 3, name: "Network & Infrastructure", code: "NET" },
  { id: 11, name: "Software Engineering", code: "SWE" },
].map((department) => ({
  ...department,
  description: "",
  headId: "",
  status: "Active",
}));
export const DEPARTMENTS = INITIAL_DEPARTMENTS.map(({ name }) => name);
// Five visible records from gradeandsacles.png; similar titles stay distinct.
export const JOB_GRADES = [
  { id: 2, name: "Grade II (Associate)", salary: 11200 },
  { id: 5, name: "Grade II", salary: 11200 },
  { id: 3, name: "Grade III (Senior)", salary: 16500 },
  { id: 6, name: "Grade III", salary: 16500 },
  { id: 7, name: "Grade IV", salary: 24000 },
];
export const EMPLOYEE_STATUSES = [
  "Active",
  "On Leave",
  "Inactive",
  "Onboarding",
];
export const EMPLOYMENT_TYPES = ["Permanent", "Contract", "Temporary"];
export const PORTAL_ROLES = ["Employee", "Head of Department", "HR Manager"];

// Leave records and balances transcribed from leaveapproval.png.
// Used days already include the approved requests below.
export const MAX_LEAVE_BALANCE = 90;
export const INITIAL_LEAVE_SETTINGS = {
  defaultEntitlement: "90",
  maxBalance: "90",
  dayCounting: "calendar",
  noticeDays: "0",
  requireRejectionReason: true,
};
export const INITIAL_LEAVE_REQUESTS = [
  {
    id: "LV-001",
    employeeId: "5601",
    employeeName: "Tesfaye Alemayew",
    department: "Software Engineering",
    startDate: "2026-10-31",
    endDate: "2026-11-06",
    daysRequested: 7,
    reason: "Official annual leave",
    status: "APPROVED",
  },
  {
    id: "LV-002",
    employeeId: "Epy123",
    employeeName: "Besufekad Ermias",
    department: "Database & Cloud Administration",
    startDate: "2026-11-30",
    endDate: "2026-12-29",
    daysRequested: 30,
    reason: "Official annual leave",
    status: "REJECTED",
  },
  {
    id: "LV-003",
    employeeId: "T2323",
    employeeName: "Tedwodros Kifle",
    department: "Cybersecurity & Quality Assurance",
    startDate: "2026-10-29",
    endDate: "2026-11-27",
    daysRequested: 30,
    reason: "Official annual leave",
    status: "APPROVED",
  },
];
export const INITIAL_LEAVE_BALANCES = [
  { employeeId: "5601", yearStart: "2026-09-11", accrued: 90, used: 7 },
  { employeeId: "Epy123", yearStart: "2026-09-11", accrued: 90, used: 0 },
  { employeeId: "T2323", yearStart: "2026-09-11", accrued: 90, used: 30 },
];

// Initial attendance records for the Admin workspace.
export const INITIAL_ATTENDANCE_DATE = "2026-11-09";
export const ATTENDANCE_PAGES = [
  { id: "attendance", label: "Overview", href: "#/attendance" },
  { id: "check-in-logs", label: "Check-In Logs", href: "#/attendance/logs" },
  {
    id: "late-arrivals",
    label: "Late Arrivals",
    href: "#/attendance/late-arrivals",
  },
  {
    id: "attendance-settings",
    label: "Settings",
    href: "#/attendance/settings",
  },
];
// Defaults match the ATTENDANCE_* settings in server/src/database/schema.sql.
export const INITIAL_ATTENDANCE_SETTINGS = {
  startTime: "08:00",
  endTime: "17:00",
  gracePeriod: "15",
  allowedIps: "",
};
export const ATTENDANCE_TIME_ZONE = "Africa/Addis_Ababa";
export const ATTENDANCE_STATUSES = [
  "Present",
  "Late",
  "Absent",
  "On Leave",
  "No data",
];
export const INITIAL_ATTENDANCE_HEADS = [
  {
    employeeId: "HD-IT-001",
    department: "Hadiya Science Information Technology",
  },
];

// One daily record per employee, with a single check-in and checkout.
// Status and verification are supplied with each attendance record.
export const INITIAL_ATTENDANCE = [
  {
    employeeId: "Epy123",
    date: INITIAL_ATTENDANCE_DATE,
    status: "Present",
    checkIn: "2026-11-09T08:20:00+03:00",
    checkOut: "2026-11-09T17:05:00+03:00",
    checkInIp: "192.0.2.10",
    checkOutIp: "192.0.2.10",
    checkInVerification: "Verified",
    checkOutVerification: "Verified",
  },
  {
    employeeId: "T2323",
    date: INITIAL_ATTENDANCE_DATE,
    status: "Late",
    expectedStart: "2026-11-09T08:30:00+03:00",
    lateMinutes: 42,
    checkIn: "2026-11-09T09:12:00+03:00",
    checkOut: null,
    checkInIp: "192.0.2.10",
    checkOutIp: null,
    checkInVerification: "Verified",
    checkOutVerification: null,
  },
  {
    employeeId: "5601",
    date: INITIAL_ATTENDANCE_DATE,
    status: "Absent",
    checkIn: null,
    checkOut: null,
  },
  {
    employeeId: "2121",
    date: INITIAL_ATTENDANCE_DATE,
    status: "On Leave",
    checkIn: null,
    checkOut: null,
  },
  {
    employeeId: "HD-IT-001",
    date: INITIAL_ATTENDANCE_DATE,
    status: "Present",
    checkIn: "2026-11-09T08:15:00+03:00",
    checkOut: "2026-11-09T17:10:00+03:00",
    checkInIp: "192.0.2.10",
    checkOutIp: "198.51.100.20",
    checkInVerification: "Verified",
    checkOutVerification: "Unverified",
  },
  {
    employeeId: "Epy123",
    date: "2026-11-06",
    status: "Late",
    expectedStart: "2026-11-06T08:30:00+03:00",
    lateMinutes: 35,
    checkIn: "2026-11-06T09:05:00+03:00",
    checkOut: "2026-11-06T17:00:00+03:00",
    checkInIp: "192.0.2.10",
    checkOutIp: "192.0.2.10",
    checkInVerification: "Unavailable",
    checkOutVerification: "Unavailable",
  },
  {
    employeeId: "HD-IT-001",
    date: "2026-11-06",
    status: "Present",
    checkIn: "2026-11-06T08:10:00+03:00",
    checkOut: "2026-11-06T17:02:00+03:00",
    checkInIp: "192.0.2.10",
    checkOutIp: "192.0.2.10",
    checkInVerification: "Verified",
    checkOutVerification: "Verified",
  },
];

// TEMPORARY dashboard chart samples, ordered oldest to newest.
// These are illustrative counts, not employee attendance records.
// Backend handoff: set this switch to false when server attendance is connected.
// Dashboard uses these only when its entire current seven-day window has no data.
// Dates still come from today's date; these samples are never saved to the store.
export const USE_DEMO_DASHBOARD_ATTENDANCE = true;
export const DEMO_DASHBOARD_ATTENDANCE = [
  { present: 39, absent: 10, late: 6 },
  { present: 35, absent: 14, late: 7 },
  { present: 37, absent: 10, late: 6 },
  { present: 34, absent: 11, late: 5 },
  { present: 40, absent: 14, late: 7 },
  { present: 37, absent: 10, late: 6 },
  { present: 42, absent: 14, late: 5 },
];

export const ATTENDANCE = [
  {
    key: "present",
    label: "Present",
    count: 0,
    icon: "check-circle",
    color: "#00b578",
  },
  { key: "late", label: "Late", count: 0, icon: "timer", color: "#efaa35" },
  {
    key: "absent",
    label: "Absent",
    count: 3,
    icon: "user-minus",
    color: "#ef5677",
  },
  {
    key: "leave",
    label: "On leave",
    count: 2,
    icon: "calendar",
    color: "#9294de",
  },
];

export const SNAPSHOT = {
  activeStaff: 5,
  pendingLeaves: 0,
  onLeave: 2,
  openVacancies: 5,
  netPayroll: 112448,
};

export const NAVIGATION = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "employees", label: "Employees", icon: "users" },
  { id: "departments", label: "Departments", icon: "building" },
  { id: "grades", label: "Grades & Scales", icon: "graduation" },
  { id: "attendance", label: "Attendance", icon: "clock" },
  { id: "leave", label: "Leave Approvals", icon: "calendar" },
  { id: "payroll", label: "Payroll", icon: "wallet" },
  { id: "recruitment", label: "Recruitment", icon: "briefcase" },
  { id: "rewards", label: "Rewards", icon: "award" },
  { id: "discipline", label: "Discipline", icon: "alert-triangle" },
  { id: "career", label: "Career Tracking", icon: "trend" },
  { id: "announcements", label: "Announcements", icon: "megaphone" },
  { id: "reports", label: "Reports", icon: "bar-chart" },
  { id: "documents", label: "Documents", icon: "folder" },
  { id: "services", label: "Services", icon: "globe" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "settings", label: "General Settings", icon: "settings" },
];

export const OPERATIONS = [
  {
    id: "payroll",
    title: "Generate Monthly Payroll",
    description: "Preview payroll & export Excel",
    icon: "wallet",
    tone: "green",
  },
  {
    id: "pending-leave",
    title: "Pending Leave Requests",
    description: "0 requests awaiting your review",
    icon: "calendar",
    tone: "amber",
  },
  {
    id: "approved-leave",
    title: "Approved Leave Requests",
    description: "2 approved leave requests",
    icon: "calendar-check",
    tone: "lavender",
  },
  {
    id: "attendance",
    title: "Today’s Attendance",
    description: "0 checked in / 3 absent",
    icon: "clock",
    tone: "green",
  },
  {
    id: "applicants",
    title: "Review Candidate Applications",
    description: "Manage your recruitment pipeline",
    icon: "briefcase",
    tone: "blue",
  },
  {
    id: "announcement",
    title: "Post Staff Announcement",
    description: "Keep your team in the loop",
    icon: "bell",
    tone: "lavender",
  },
];
