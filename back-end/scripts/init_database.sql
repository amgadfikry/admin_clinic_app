# mysql script used to create new database of clinic app #

# create new database if not exists #
CREATE DATABASE IF NOT EXISTS clinic_db;

# create user api to access all data on database #
CREATE USER IF NOT EXISTS 'api'@'localhost';

# give privilages to tables that can api user can access or modify on it #
GRANT ALL PRIVILEGES ON clinic_db.* TO 'api'@'localhost';
FLUSH PRIVILEGES;