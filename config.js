const userName = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const IP = process.env.DB_IP;
const dbName = process.env.DB_NAME;
const jwtSecret = process.env.JWT_SECRET;
const jwtDays = process.env.JWT_DAYS;

module.exports = {
    jwt_secret: jwtSecret,
    jwt_valid_days: jwtDays,
    connectionString: function () {
        return 'mongodb://' + userName + ':' + password + '@' + IP + ':27017/' + dbName + '?authSource=admin';
    }
};
