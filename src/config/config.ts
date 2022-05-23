import * as dotenv from 'dotenv';

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const mysql = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
};

const AWS_KEY_ID = process.env.AWS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_SECRET_ACL = process.env.AWS_SECRET_ACL;

const aws = {
    keyid: AWS_KEY_ID,
    secretkey: AWS_SECRET_KEY
}

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const mail = {
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
}

const api_path = process.env.APP_API_PATH;

const SERVER_HOSTNAME = process.env.APP_HOST || 'localhost';
const SERVER_PORT = process.env.APP_PORT || 3000;

const server = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server,
    mysql,
    api_path,
    aws,
    mail
};

export default config;