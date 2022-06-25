import { Activity } from './activity.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Activity[]> => {
    const query = 'SELECT * FROM activity';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Activity> => {
    const query = 'SELECT * FROM activity WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByName = async (name: string): Promise<Activity> => {
    let query = 'SELECT * FROM activity WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
        .then(data => {
			if (data?.length === 0) return {};
			return data[0];
		})
        .catch(err => err);
};

export const save = async (activity: Activity): Promise<void> => {
    const query = 'INSERT INTO activity SET ?';

    return execute(query, activity)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, activity: Activity): Promise<Activity | null> => {
    const query = `UPDATE activity SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, activity)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM activity WHERE id = ${id}`;

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
