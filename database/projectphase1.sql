CREATE DATABASE CourtSystem;
USE CourtSystem;

-- Removed court_id from Judge table to allow multiple court assignments
CREATE TABLE Court (
    court_id INT PRIMARY KEY AUTO_INCREMENT,
    court_name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    court_type VARCHAR(50) NOT NULL
);

-- Judges can now be assigned to multiple courts via Judge_Court junction table
CREATE TABLE Judge (
    judge_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    experience_years INT NOT NULL
);

-- New junction table for judge-court assignments
CREATE TABLE Judge_Court (
    judge_id INT,
    court_id INT,
    PRIMARY KEY (judge_id, court_id),
    FOREIGN KEY (judge_id) REFERENCES Judge(judge_id),
    FOREIGN KEY (court_id) REFERENCES Court(court_id)
);

CREATE TABLE Lawyer (
    lawyer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    specialization VARCHAR(50) NOT NULL,
    experience_years INT NOT NULL
);

-- Cases can now have multiple judges via Case_Judge junction table (new)
CREATE TABLE CaseDetails (
    case_id INT PRIMARY KEY AUTO_INCREMENT,
    case_number VARCHAR(50) NOT NULL,
    case_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    court_id INT,
    FOREIGN KEY (court_id) REFERENCES Court(court_id)
);

-- New junction table for multiple judges per case
CREATE TABLE Case_Judge (
    case_id INT,
    judge_id INT,
    PRIMARY KEY (case_id, judge_id),
    FOREIGN KEY (case_id) REFERENCES CaseDetails(case_id),
    FOREIGN KEY (judge_id) REFERENCES Judge(judge_id)
);

CREATE TABLE Plaintiff (
    plaintiff_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    contact_number VARCHAR(15) NOT NULL
);

CREATE TABLE Defendant (
    defendant_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    contact_number VARCHAR(15) NOT NULL
);

-- Added CHECK constraint for party_type validation
CREATE TABLE Case_Party (
    party_id INT PRIMARY KEY AUTO_INCREMENT,
    case_id INT,
    party_type VARCHAR(50) NOT NULL CHECK (party_type IN ('Plaintiff', 'Defendant')),
    plaintiff_id INT,
    defendant_id INT,
    FOREIGN KEY (case_id) REFERENCES CaseDetails(case_id),
    FOREIGN KEY (plaintiff_id) REFERENCES Plaintiff(plaintiff_id),
    FOREIGN KEY (defendant_id) REFERENCES Defendant(defendant_id),
    CONSTRAINT chk_party CHECK (
        (party_type = 'Plaintiff' AND plaintiff_id IS NOT NULL AND defendant_id IS NULL) OR 
        (party_type = 'Defendant' AND defendant_id IS NOT NULL AND plaintiff_id IS NULL)
    )
);

-- Judges can give multiple verdicts (no changes needed here)
CREATE TABLE Verdict (
    verdict_id INT PRIMARY KEY AUTO_INCREMENT,
    case_id INT,
    judge_id INT,
    decision TEXT NOT NULL,
    FOREIGN KEY (case_id) REFERENCES CaseDetails(case_id),
    FOREIGN KEY (judge_id) REFERENCES Judge(judge_id)
);

CREATE TABLE Case_Lawyer (
    case_lawyer_id INT PRIMARY KEY AUTO_INCREMENT,
    case_id INT,
    lawyer_id INT,
    role VARCHAR(50) NOT NULL,
    FOREIGN KEY (case_id) REFERENCES CaseDetails(case_id),
    FOREIGN KEY (lawyer_id) REFERENCES Lawyer(lawyer_id)
);

-- Removed MasterTable (anti-pattern for relational databases)
-- Added user roles with proper relationships
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'judge', 'lawyer', 'clerk')),
    judge_id INT NULL,
    lawyer_id INT NULL,
    clerk_id INT NULL,
    FOREIGN KEY (judge_id) REFERENCES Judge(judge_id),
    FOREIGN KEY (lawyer_id) REFERENCES Lawyer(lawyer_id)
);
