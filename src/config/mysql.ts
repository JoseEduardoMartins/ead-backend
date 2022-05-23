import { createPool, Pool } from 'mysql2';
import config from './config';

let pool: Pool;

export const connect = () => {
    try {
        pool = createPool({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database
        });
    } catch (error) {
        console.error('Mysql connect > Error: ', error);
        throw new Error('Mysql connect > failed to initialized pool');
    }
};

export const execute = (query: string, params: string | string[] | object | number): Promise<any> => {
    try {
        if (!pool) connect();

        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

    } catch (error) {
        console.error('Mysql execute > Error: ', error);
        throw new Error('Mysql execute > failed to execute query');
    }
};
