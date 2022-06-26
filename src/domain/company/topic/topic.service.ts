import { Topic } from './topic.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Topic[]> => {
    const query = 'SELECT * FROM topic';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Topic> => {
    const query = 'SELECT * FROM topic WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByCourseId = async (id: number): Promise<Topic[]> => {
    const query = 'SELECT * FROM topic WHERE course_id = ?';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
        .then(data => data)
        .catch(err => err);
};

export const findByName = async (name: string): Promise<Topic> => {
    let query = 'SELECT * FROM topic WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
        .then(data => {
			if (data?.length === 0) return {};
			return data[0];
		})
        .catch(err => err);
};

export const save = async (topic: Topic): Promise<void> => {
    const query = 'INSERT INTO topic SET ?';

    return execute(query, topic)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, topic: Topic): Promise<Topic | null> => {
    const query = `UPDATE topic SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, topic)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM topic WHERE id = ${id}`;

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
