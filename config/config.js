const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = 'dev'; //production or development
CONFIG.port = process.env.PORT || '3033';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST_PROD || 'socket-docs.cwkkzjrq6ykq.ap-south-1.rds.amazonaws.com';
CONFIG.db_port = process.env.DB_PORT || '3000';
CONFIG.db_name = process.env.DB_NAME_PROD || 'socket-io-docs';
CONFIG.db_user = process.env.DB_USER_PROD || 'root';
CONFIG.db_password = process.env.DB_PASSWORD_PROD || 'ritika';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;