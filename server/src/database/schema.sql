-- ============================================================
-- HRMS Zone DB — Hadiya Science Information Technology Dept.
-- Complete Unified Database Schema (All 22 Tables & Seed Data)============================================================

CREATE DATABASE IF NOT EXISTS hrms_hadiya_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hrms_hadiya_db;

-- ── 1. USERS & AUTHENTICATION ────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('JOB_SEEKER', 'EMPLOYEE', 'DEPARTMENT_HEAD', 'HR_MANAGER') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    must_change_password BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── 2. DEPARTMENTS & JOB GRADES ──────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    head_employee_id INT DEFAULT NULL COMMENT 'Employee designated as Department Head'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS job_grades (
    grade_id INT PRIMARY KEY AUTO_INCREMENT,
    grade_name VARCHAR(20) NOT NULL UNIQUE,
    base_salary DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

-- ── 3. EMPLOYEES & LIFECYCLE MANAGEMENT ──────────────────────
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    employee_serial_no VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) DEFAULT NULL,
    gender ENUM('MALE', 'FEMALE') NOT NULL,
    birth_date DATE NOT NULL,
    photo_data DEFAULT NULL,
    education_doc_data NOT NULL DEFAULT '',
    qualification VARCHAR(225),
    department_id INT,
    grade_id INT,
    employment_type ENUM('PERMANENT', 'CONTRACT', 'TRANSFER') DEFAULT 'PERMANENT',
    status ENUM('ACTIVE', 'TRANSFERRED', 'RETIRED', 'SUSPENDED', 'TERMINATED') DEFAULT 'ACTIVE',
    hired_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL,
    FOREIGN KEY (grade_id) REFERENCES job_grades(grade_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Circular Foreign Key for Department Head
ALTER TABLE departments
    DROP FOREIGN KEY IF EXISTS fk_department_head;

ALTER TABLE departments
    ADD CONSTRAINT fk_department_head 
    FOREIGN KEY (head_employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL;

-- ── 4. CAREER MILESTONES & PROMOTIONS ────────────────────────
CREATE TABLE IF NOT EXISTS career_milestones (
    milestone_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    milestone_type ENUM('PROMOTION', 'STEP_INCREMENT', 'GRADE_CHANGE', 'AWARD_MILESTONE') NOT NULL,
    previous_grade_id INT,
    new_grade_id INT,
    description TEXT NOT NULL,
    effective_date DATE NOT NULL,
    approved_by_hr_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (previous_grade_id) REFERENCES job_grades(grade_id) ON DELETE SET NULL,
    FOREIGN KEY (new_grade_id) REFERENCES job_grades(grade_id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by_hr_id) REFERENCES employees(employee_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── 5. REWARDS & RECOGNITIONS ────────────────────────────────
CREATE TABLE IF NOT EXISTS rewards_and_recognitions (
    reward_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    award_title VARCHAR(150) NOT NULL,
    award_category ENUM('EXCELLENCE', 'INNOVATION', 'LONG_SERVICE', 'PUNCTUALITY') NOT NULL,
    reward_description TEXT,
    award_date DATE NOT NULL,
    certificate_url VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 6. ATTENDANCE TRACKING ───────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    check_in DATETIME NOT NULL,
    check_out DATETIME,
    status ENUM('PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE') DEFAULT 'PRESENT',
    ip_address VARCHAR(45),
    INDEX idx_attendance_emp_checkin (employee_id, check_in),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 7. LEAVE MANAGEMENT & 90-DAY CAP RULE ────────────────────
CREATE TABLE IF NOT EXISTS leave_requests (
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_requested INT NOT NULL,
    reason TEXT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    INDEX idx_leave_emp_status (employee_id, status),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS leave_balances (
    employee_id INT PRIMARY KEY,
    total_accrued_days INT DEFAULT 30,
    used_days INT DEFAULT 0,
    remaining_balance INT GENERATED ALWAYS AS (total_accrued_days - used_days) STORED,
    CONSTRAINT chk_max_leave_cap CHECK (remaining_balance <= 90),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 8. DISCIPLINE & PENALTIES ────────────────────────────────
CREATE TABLE IF NOT EXISTS disciplinary_records (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    incident_date DATE NOT NULL,
    violation_type VARCHAR(100) NOT NULL,
    penalty_action ENUM('WARNING', 'FINE', 'SUSPENSION', 'TERMINATION') NOT NULL,
    description TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 9. PAYROLL & DEDUCTIONS ENGINE ───────────────────────────
CREATE TABLE IF NOT EXISTS payroll_records (
    payroll_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    payroll_month VARCHAR(7) NOT NULL,
    gross_salary DECIMAL(10, 2) NOT NULL,
    income_tax DECIMAL(10, 2) NOT NULL,
    pension_deduction DECIMAL(10, 2) NOT NULL,
    party_contribution DECIMAL(10, 2) DEFAULT 0.00,
    hadiya_dev_contribution DECIMAL(10, 2) DEFAULT 0.00,
    voluntary_contribution DECIMAL(10, 2) DEFAULT 0.00,
    total_deductions DECIMAL(10, 2) GENERATED ALWAYS AS (
        income_tax + pension_deduction + party_contribution + hadiya_dev_contribution + voluntary_contribution
    ) STORED,
    net_salary DECIMAL(10, 2) GENERATED ALWAYS AS (gross_salary - total_deductions) STORED,
    status ENUM('GENERATED', 'FORWARDED_TO_FINANCE', 'PAID') DEFAULT 'GENERATED',
    forwarded_at TIMESTAMP NULL,
    UNIQUE KEY uq_payroll_emp_month (employee_id, payroll_month),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 10. RECRUITMENT & JOB POSTINGS ───────────────────────────
CREATE TABLE IF NOT EXISTS job_postings (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    description TEXT NOT NULL,
    deadline DATE NOT NULL,
    status ENUM('OPEN', 'CLOSED') DEFAULT 'OPEN',
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS job_applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    credentials_url VARCHAR(255) NOT NULL,
    status ENUM('PENDING', 'HIRED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── 11. INSTITUTIONAL DOCUMENTS ──────────────────────────────
CREATE TABLE IF NOT EXISTS institutional_documents (
    doc_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    file_data VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── 12. SYSTEM REPORTS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS system_reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    report_type ENUM('PAYROLL_SUMMARY', 'ATTENDANCE_SUMMARY', 'LEAVE_REPORT', 'RECRUITMENT_SUMMARY', 'DISCIPLINARY_REPORT', 'EMPLOYEE_SUBMISSION') NOT NULL,
    generated_by_user_id INT NOT NULL,
    report_parameters TEXT,
    file_data VARCHAR(255) NOT NULL DEFAULT 'N/A',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (generated_by_user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 13. ANNOUNCEMENTS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
    announcement_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    posted_by_user_id INT NOT NULL,
    target_audience ENUM('ALL', 'EMPLOYEES', 'JOB_SEEKERS') DEFAULT 'ALL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by_user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 14. NEWS POSTS ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS news_posts (
    news_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE COMMENT 
    summary VARCHAR(500) DEFAULT NULL COMMENT 'Short excerpt shown in listing cards',
    body LONGTEXT NOT NULL COMMENT,
    cover_image VARCHAR(255) DEFAULT NULL COMMENT 'Path or URL to the cover image',
    category ENUM('GENERAL', 'EVENTS', 'ACHIEVEMENTS', 'TENDERS', 'IT_UPDATES') NOT NULL DEFAULT 'GENERAL',
    status ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    published_at DATETIME DEFAULT NULL COMMENT 'NULL while still a draft',
    posted_by_user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_news_status_published (status, published_at),
    FOREIGN KEY (posted_by_user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 15. PUBLIC SERVICES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public_services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT NULL COMMENT 'Icon class or asset name used in the UI',
    category ENUM('IT_SUPPORT', 'TRAINING', 'CERTIFICATION', 'CONSULTING', 'OTHER') NOT NULL DEFAULT 'OTHER',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by_user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_public_services_active (is_active),
    FOREIGN KEY (created_by_user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 16. ENQUIRIES (CONTACT FORM) ─────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
    enquiry_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT DEFAULT NULL COMMENT 'Logged-in user, or NULL for anonymous',
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20)  DEFAULT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status  ENUM('NEW', 'IN_REVIEW', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    resolved_by_user_id INT DEFAULT NULL COMMENT 'HR/admin who resolved this enquiry',
    resolved_at  DATETIME DEFAULT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_enquiries_status (status, created_at),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (resolved_by_user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── 17. NOTIFICATIONS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    recipient_user_id INT NOT NULL,
    type ENUM(
        'LEAVE_APPROVED', 'LEAVE_REJECTED', 'LEAVE_PENDING',
        'PAYROLL_GENERATED', 'PAYROLL_PAID',
        'ATTENDANCE_ALERT',
        'ANNOUNCEMENT',
        'RECRUITMENT_UPDATE',
        'SYSTEM'
    ) NOT NULL,
    title   VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    entity_type VARCHAR(50)  DEFAULT NULL COMMENT 'e.g. leave_request, payroll_record',
    entity_id   INT          DEFAULT NULL COMMENT 'PK of the related entity row',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_notifications_user_read (recipient_user_id, is_read, created_at),
    FOREIGN KEY (recipient_user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 18. PASSWORD RESETS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS password_resets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    email VARCHAR(150) NOT NULL,
    token VARCHAR(255) NOT NULL,
    otp_code VARCHAR(10) NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (token),
    INDEX (otp_code),
    INDEX (email),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── 19. SYSTEM SETTINGS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS system_settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
	setting_ip VARCHAR(100) NOT NULL,
    setting_value TEXT NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Seed HR Manager user (user_id=1) and Employee user (user_id=2)
-- Passwords are bcrypt hashes of 'Admin@1234' — change after first login
INSERT INTO users (user_id, full_name, email, password_hash, role, is_active, must_change_password) VALUES
(1, 'HR Administrator', 'admin@hadiya.gov.et', '$2b$10$8Kw1mZQHv3hJPqN5FpXRuOv7KlBgY9MzNcT2sWxEaRdViUoLjCqGy', 'HR_MANAGER', TRUE, FALSE),
(2, 'Abebe Bekele Tufa', 'emp001@hadiya.gov.et', '$2b$10$8Kw1mZQHv3hJPqN5FpXRuOv7KlBgY9MzNcT2sWxEaRdViUoLjCqGy', 'EMPLOYEE', TRUE, TRUE)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- Default departments
INSERT IGNORE INTO departments (department_id, department_name) VALUES
(1, 'Hadiya Science Information Technology'),
(2, 'Software & Systems Engineering'),
(3, 'Network & Infrastructure'),
(4, 'Database & Cloud Administration'),
(5, 'Cybersecurity & Quality Assurance');

-- Default job grades
INSERT INTO job_grades (grade_id, grade_name, base_salary) VALUES
(1, 'Grade I', 7500.00),
(2, 'Grade II', 11200.00),
(3, 'Grade III', 16500.00),
(4, 'Grade IV', 24000.00),
(5, 'Grade V', 32000.00)
ON DUPLICATE KEY UPDATE base_salary = VALUES(base_salary);



-- Sample Employee record
INSERT INTO employees (
    employee_id, user_id, employee_serial_no, full_name, email, gender, 
    birth_date, qualification, department_id, grade_id, employment_type, status, hired_date
) VALUES (
    1, 2, 'HD-IT-001', 'Abebe Bekele Tufa', 'emp001@hadiya.gov.et', 'MALE', 
    '1992-05-14', 'MSc in Computer Science', 1, 3, 'PERMANENT', 'ACTIVE', '2022-01-15'
) ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- Sample Leave Balance
INSERT INTO leave_balances (employee_id, total_accrued_days, used_days) VALUES
(1, 30, 4)
ON DUPLICATE KEY UPDATE total_accrued_days = VALUES(total_accrued_days);

-- Sample Job Vacancies
INSERT INTO job_postings (job_id, title, department_id, description, deadline, status) VALUES
(1, 'Senior Full Stack Software Engineer', 1, 'We are seeking an experienced Full Stack Developer skilled in Node.js, React, and MySQL to modernize institutional software systems for Hadiya Zone Science and Information Technology.', '2026-12-31', 'OPEN'),
(2, 'Network Infrastructure Administrator', 3, 'Manage high-speed regional network backbone, data center fiber connections, and server virtualization for governmental departments.', '2026-11-30', 'OPEN'),
(3, 'Cybersecurity Officer', 5, 'Implement security policies, vulnerability auditing, incident response, and zero-trust controls for critical IT infrastructure.', '2026-12-15', 'OPEN')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Sample Announcements
INSERT INTO announcements (announcement_id, title, content, posted_by_user_id, target_audience) VALUES
(1, 'Welcome to Hadiya Science & IT Department HRMS', 'The department is pleased to launch our comprehensive HRMS portal for staff management, recruitment tracking, attendance, and payroll services.', 1, 'ALL'),
(2, 'Mandatory Password Reset on First Login', 'All employees logging in with initial HR-provided credentials must update their password immediately via the Employee Portal.', 1, 'EMPLOYEES'),
(3, '2026 Q4 IT Positions Open for Application', 'Qualified applicants are invited to submit their credentials through our Vacancy Portal. Track your status directly in your dashboard.', 1, 'JOB_SEEKERS')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Sample News Posts (Public Client Portal)
INSERT INTO news_posts (news_id, title, slug, summary, body, category, status, published_at, posted_by_user_id) VALUES
(1, 'Hadiya Zone Launches Next-Gen E-Government Data Center', 'hadiya-zone-launches-next-gen-e-gov-data-center', 'The Department of Science & IT successfully commissioned the zonal modern Tier-2 standard server infrastructure.', 'The Hadiya Zone Science and Information Technology Department has officially inaugurated its centralized regional data center in Hosanna. This high-availability facility powers cloud infrastructure, e-services, and inter-departmental digital communication.', 'IT_UPDATES', 'PUBLISHED', '2026-10-15 09:00:00', 1),
(2, 'Annual Civil Service Digital Literacy Training Programme 2026', 'annual-civil-service-digital-literacy-2026', 'Over 450 public servants completed certified training in cyber hygiene and automated office tooling.', 'In partnership with regional educational institutes, our capacity-building unit completed the third cohort of foundational and intermediate software engineering and digital administration certifications.', 'TRAINING', 'PUBLISHED', '2026-11-01 10:30:00', 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Sample Public Services
INSERT INTO public_services (service_id, name, description, icon, category, is_active, created_by_user_id) VALUES
(1, 'Institutional IT & Network Support', 'Technical diagnosis, LAN maintenance, and network connectivity troubleshooting for zonal sector bureaus.', 'Server', 'IT_SUPPORT', TRUE, 1),
(2, 'Government Portal & Web Hosting', 'Standardized domain provisioning, official email setup, and portal hosting on regional cloud servers.', 'Globe', 'IT_SUPPORT', TRUE, 1),
(3, 'Digital Literacy & Staff Certification', 'Accredited practical computer competency, database handling, and civil service software workflow training.', 'GraduationCap', 'TRAINING', TRUE, 1),
(4, 'Software Systems & Database Development', 'Custom departmental database application design, workflow automation, and institutional software maintenance.', 'Code', 'CONSULTING', TRUE, 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Sample Employee Notifications
INSERT INTO notifications (notification_id, recipient_user_id, type, title, message, is_read, entity_type, entity_id) VALUES
(1, 2, 'SYSTEM', 'Welcome to Hadiya Zone HRMS Portal', 'Welcome to your digital employee portal. You can view payslips, record attendance, and request leaves here.', FALSE, NULL, NULL)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Complete System Settings (Matches UI Configuration & Security Settings)
INSERT INTO system_settings (setting_key, setting_ip, setting_value, description) VALUES
('ORGANIZATION_NAME', '', 'Hadiya Zone Science and Information Technology Department', 'Official organization name displayed across the system'),
('REGIONAL_STATE', '', 'Central Ethiopia Regional State', 'Regional State of the department'),
('ADMINISTRATIVE_ZONE', '', 'Hadiya Zone', 'Zonal administrative division'),
('ADMINISTRATIVE_CAPITAL', '', 'Hosanna', 'Administrative capital city'),
('DIRECTORATE_HEAD', '', 'Dr. Tadesse Bekele', 'Directorate head or cabinet leader name'),
('CONTACT_EMAIL', '', 'info@hadiyasit.gov.et', 'Official contact email address'),
('CONTACT_PHONE', '', '+251 46 555 1234', 'Official contact telephone number'),
('OFFICE_HEADQUARTERS', '', 'Zonal Administration Complex, Block A', 'Physical headquarters building and address'),
('MANAGER_ALLOWED_IPS', '127.0.0.1', '127.0.0.1, ::1', 'Authorized IP addresses / subnets for manager space access'),
('MANAGER_IP_RESTRICTION_ENABLED', '', 'false', 'Flag to enforce strict IP address restriction for manager portal'),
('ATTENDANCE_ALLOWED_IPS', '', '', 'Optional authorized office Wi-Fi / LAN IP addresses for attendance logging'),
('ATTENDANCE_START_TIME', '', '08:00 AM', 'Standard duty start time for civil servants'),
('ATTENDANCE_END_TIME', '', '05:00 PM', 'Standard duty end time for civil servants'),
('ATTENDANCE_GRACE_PERIOD_MINS', '', '15', 'Late threshold grace period in minutes'),
('TAX_PENSION_RATE', '', '0.07', 'Standard employee pension deduction rate (7%)'),
('EMPLOYER_PENSION_RATE', '', '0.11', 'Statutory government / employer pension contribution rate (11%)'),
('MAX_LEAVE_CAP', '', '90', 'Maximum accrued leave balance cap allowed per employee'),
('DEFAULT_CURRENCY', '', 'ETB', 'Default currency code used in payroll and financial calculations'),
('SYSTEM_MAINTENANCE_MODE', '', 'false', 'Flag to toggle global maintenance mode')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), description = VALUES(description);
