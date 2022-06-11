import * as dotenv from 'dotenv';

dotenv.config();

const api ={
    path: process.env.APP_API_PATH,
    key: process.env.APP_API_KEY
}

const server = {
    hostname: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 3000
};

const mysql = {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
};

const mail = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
}

export {
    api,
    server,
    mysql,
    mail
};