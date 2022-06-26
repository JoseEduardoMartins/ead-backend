import { Theme } from './theme.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Theme[]> => {
    const query = 'SELECT * FROM theme';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Theme> => {
    const query = 'SELECT * FROM theme WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByTopicId = async (id: number): Promise<Theme[]> => {
    const query = 'SELECT * FROM theme WHERE topic_id = ?';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
        .then(data => data)
        .catch(err => err);
};

export const findByName = async (name: string): Promise<Theme> => {
    let query = 'SELECT * FROM theme WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
        .then(data => {
			if (data?.length === 0) return {};
			return data[0];
		})
        .catch(err => err);
};

export const save = async (theme: Theme): Promise<void> => {
    const query = 'INSERT INTO theme SET ?';

    return execute(query, theme)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, theme: Theme): Promise<Theme | null> => {
    const query = `UPDATE theme SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, theme)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM theme WHERE id = ${id}`;

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
