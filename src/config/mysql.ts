import { createPool, Pool } from 'mysql2';
import { mysql } from './config';
let pool: Pool;

export const connect = () => {
    try {
        pool = createPool({
            host: mysql.host,
            user: mysql.user,
            password: mysql.password,
            database: mysql.database
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
