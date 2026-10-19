-- =================================================================
-- [VM-5] MariaDB 초기화 스크립트 (초기 인코딩 및 권한 설정)
-- 실제 테이블 스키마는 Spring Boot 구동 시 Flyway (V1 ~ V21)에 의해 자동 생성됩니다.
-- =================================================================

CREATE DATABASE IF NOT EXISTS `messaging_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON `messaging_db`.* TO 'msg_user'@'%' IDENTIFIED BY 'msg_secure_pass';
FLUSH PRIVILEGES;
