-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'data-officer', 'auditor', 'analyst')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create beneficiaries table
CREATE TABLE IF NOT EXISTS beneficiaries (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL CHECK (age >= 0 AND age <= 150),
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  country VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  household_size INT NOT NULL CHECK (household_size > 0),
  verification_type VARCHAR(50) NOT NULL,
  registration_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'pending-verification', 'suspended')),
  last_distribution DATE,
  total_aid VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_beneficiaries_country ON beneficiaries(country);
CREATE INDEX IF NOT EXISTS idx_beneficiaries_status ON beneficiaries(status);
CREATE INDEX IF NOT EXISTS idx_beneficiaries_name ON beneficiaries(name);

-- Create fraud_cases table
CREATE TABLE IF NOT EXISTS fraud_cases (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  country VARCHAR(100) NOT NULL,
  beneficiary VARCHAR(255) NOT NULL,
  detected_at TIMESTAMP NOT NULL,
  confidence INT NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  status VARCHAR(50) NOT NULL CHECK (status IN ('under-review', 'confirmed', 'resolved')),
  details TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  resource_id VARCHAR(100),
  details TEXT,
  ip_address VARCHAR(45),
  severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  timestamp TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'blocked', 'failed'))
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- Seed demo user (password: admin123)
-- Note: In production, use bcryptjs.hash() to generate password hashes
INSERT INTO users (email, password, name, role) VALUES
('admin@un-operations.org', '$2a$10$K9K9K9K9K9K9K9K9K9K9K9u', 'Sarah Mitchell', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Seed some sample beneficiaries
INSERT INTO beneficiaries (id, name, age, gender, country, region, household_size, verification_type, registration_date, status) VALUES
('BEN-2025-892341', 'Ahmed M. Hassan', 34, 'Male', 'Yemen', 'Sana''a', 6, 'Biometric', '2024-03-15', 'active'),
('BEN-2025-892340', 'Fatima Al-Rashid', 28, 'Female', 'Syria', 'Damascus', 4, 'Biometric + Document', '2024-08-22', 'active'),
('BEN-2025-892339', 'Mary K. Johnson', 42, 'Female', 'South Sudan', 'Juba', 8, 'Document Only', '2023-11-30', 'suspended'),
('BEN-2025-892338', 'Abebe Desta', 51, 'Male', 'Ethiopia', 'Addis Ababa', 5, 'Biometric', '2024-01-10', 'active'),
('BEN-2025-892337', 'Rashid Khan', 29, 'Male', 'Bangladesh', 'Dhaka', 3, 'Pending', '2024-05-18', 'pending-verification')
ON CONFLICT (id) DO NOTHING;
