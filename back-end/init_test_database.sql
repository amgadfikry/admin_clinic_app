-- Create a new test database if it does not exist
CREATE DATABASE IF NOT EXISTS clinic_test_db;

-- Create a user 'api_test' with a password if it does not exist
CREATE USER IF NOT EXISTS 'api_test'@'%' IDENTIFIED BY 'test';

-- Grant all privileges on the 'clinic_test_db' database to the 'api_test' user
GRANT ALL PRIVILEGES ON clinic_test_db.* TO 'api_test'@'%';

-- Flush privileges to apply the changes immediately
FLUSH PRIVILEGES;
