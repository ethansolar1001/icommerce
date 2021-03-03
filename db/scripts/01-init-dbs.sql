# create databases
CREATE DATABASE IF NOT EXISTS `product-service` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `audit-service` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# create root user and grant permissions
DROP USER IF EXISTS 'root'@'%';
CREATE USER 'root'@'%' IDENTIFIED BY 'P@ssw0rd';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'P@ssw0rd';
FLUSH PRIVILEGES;