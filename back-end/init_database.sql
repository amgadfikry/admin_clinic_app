# Create a new database if it does not exist #
CREATE DATABASE IF NOT EXISTS clinic_db;

# Create a user 'api' if it does not exist #
CREATE USER IF NOT EXISTS 'api'@'localhost';

# Grant all privileges on the 'clinic_db' database to the 'apiflask' user #
GRANT ALL PRIVILEGES ON clinic_db.* TO 'api'@'localhost';

# Flush privileges to apply the changes immediately #
FLUSH PRIVILEGES;
