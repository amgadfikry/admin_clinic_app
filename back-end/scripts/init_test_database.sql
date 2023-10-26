# Create a new test database if it does not exist #
CREATE DATABASE IF NOT EXISTS clinic_test_db;

# Create a user 'api_test' if it does not exist #
CREATE USER IF NOT EXISTS 'api_test'@'localhost';

# Grant all privileges on the 'clinic_test_db' database to the 'apiflask' user #
GRANT ALL PRIVILEGES ON clinic_test_db.* TO 'api_test'@'localhost';

# Flush privileges to apply the changes immediately #
FLUSH PRIVILEGES;
