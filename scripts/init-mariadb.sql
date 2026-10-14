-- ==============================================================================
-- MariaDB Initialization Script for Messaging Platform
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `messagedb` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS `fileprocessor` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Ensure root has remote access
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

-- Ensure fileprocessor dedicated user exists
CREATE USER IF NOT EXISTS 'fileprocessor'@'%' IDENTIFIED BY 'fileprocessor';
GRANT ALL PRIVILEGES ON `fileprocessor`.* TO 'fileprocessor'@'%';

FLUSH PRIVILEGES;
