CREATE DATABASE CourtSystem;
USE CourtSystem;

CREATE TABLE Court (
    court_id INT PRIMARY KEY AUTO_INCREMENT,
    court_name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    court_type VARCHAR(50) NOT NULL
);

CREATE TABLE Judge (
    judge_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    experience_years INT NOT NULL,
    court_id INT,
    FOREIGN KEY (court_id) REFERENCES Court(court_id)
);

CREATE TABLE Lawyer (
    lawyer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    specialization VARCHAR(50) NOT NULL,
    experience_years INT NOT NULL
);

CREATE TABLE CaseDetails (
    case_id INT PRIMARY KEY AUTO_INCREMENT,
    case_number VARCHAR(50) NOT NULL,
    case_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    court_id INT,
    judge_id INT,
    FOREIGN KEY (court_id) REFERENCES Court(court_id),
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

CREATE TABLE Case_Party (
    party_id INT PRIMARY KEY AUTO_INCREMENT,
    case_id INT,
    party_type VARCHAR(50) NOT NULL,
    plaintiff_id INT NULL,
    defendant_id INT NULL,
    FOREIGN KEY (case_id) REFERENCES CaseDetails(case_id),
    FOREIGN KEY (plaintiff_id) REFERENCES Plaintiff(plaintiff_id),
    FOREIGN KEY (defendant_id) REFERENCES Defendant(defendant_id)
);

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

CREATE TABLE MasterTable (
    master_id INT PRIMARY KEY AUTO_INCREMENT,
    court_id INT NULL,
    judge_id INT NULL,
    lawyer_id INT NULL,
    case_id INT NULL,
    plaintiff_id INT NULL,
    defendant_id INT NULL,
    party_id INT NULL,
    verdict_id INT NULL,
    case_lawyer_id INT NULL,
    FOREIGN KEY (court_id) REFERENCES Court(court_id) ON DELETE SET NULL,
    FOREIGN KEY (judge_id) REFERENCES Judge(judge_id) ON DELETE SET NULL,
    FOREIGN KEY (lawyer_id) REFERENCES Lawyer(lawyer_id) ON DELETE SET NULL,
    FOREIGN KEY (case_id) REFERENCES CaseDetails(case_id) ON DELETE SET NULL,
    FOREIGN KEY (plaintiff_id) REFERENCES Plaintiff(plaintiff_id) ON DELETE SET NULL,
    FOREIGN KEY (defendant_id) REFERENCES Defendant(defendant_id) ON DELETE SET NULL,
    FOREIGN KEY (party_id) REFERENCES Case_Party(party_id) ON DELETE SET NULL,
    FOREIGN KEY (verdict_id) REFERENCES Verdict(verdict_id) ON DELETE SET NULL,
    FOREIGN KEY (case_lawyer_id) REFERENCES Case_Lawyer(case_lawyer_id) ON DELETE SET NULL
);
