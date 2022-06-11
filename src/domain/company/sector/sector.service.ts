import { Sector } from './sector.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Sector[]> => {
    const query = 'SELECT * FROM sector';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Sector> => {
    const query = 'SELECT * FROM sector WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByName = async (name: string): Promise<Sector> => {
    const query = 'SELECT * FROM sector WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const save = async (sector: Sector): Promise<void> => {
    const query = 'INSERT INTO sector SET ?';

    return execute(query, sector)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, sector: Sector): Promise<Sector | null> => {
    const query = `UPDATE sector SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, sector)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM sector WHERE id = ${id}`;

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
