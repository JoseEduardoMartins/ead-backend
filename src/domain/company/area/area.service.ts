import { Area } from './area.model';
import { execute } from '../../../config/mysql';

export const findByFilters = async (filters: object): Promise<Area> => {
    let query = 'SELECT * FROM area';

    const elements = Object.entries(filters);

    if (elements.length > 0) query += ' WHERE ';

    elements.forEach((element, index) => {
        if(element[0] === 'user') element[0] = 'user_id';
        if(element[0] === 'course') element[0] = 'course_id';

        query += `${element[0]} = '${element[1]}'`;

        if(index < elements.length-1) query += ' AND ';
    });

    return execute(query, {})
        .then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Area> => {
    const query = 'SELECT * FROM area WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByName = async (name: string): Promise<Area> => {
    const query = 'SELECT * FROM area WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const save = async (area: Area): Promise<void> => {
    const query = 'INSERT INTO area SET ?';

    return execute(query, area)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, area: Area): Promise<Area | null> => {
    const query = `UPDATE area SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, area)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM area WHERE id = ${id}`;

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
