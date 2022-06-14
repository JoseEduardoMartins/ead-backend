import { Technology } from './technology.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Technology[]> => {
    const query = 'SELECT * FROM technology';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Technology> => {
    const query = 'SELECT * FROM technology WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByName = async (name: string): Promise<Technology> => {
    const query = 'SELECT * FROM technology WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const save = async (technology: Technology): Promise<void> => {
    const query = 'INSERT INTO technology SET ?';

    return execute(query, technology)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, technology: Technology): Promise<Technology | null> => {
    const query = `UPDATE technology SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, technology)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM technology WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

const validators = {
    number: (value: number) => Number.isInteger(value),
    string: (value: string) => value.toString()
};
