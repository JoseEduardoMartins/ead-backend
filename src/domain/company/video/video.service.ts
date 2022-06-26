import { Video } from './video.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Video[]> => {
    const query = 'SELECT * FROM video';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Video> => {
    const query = 'SELECT * FROM video WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		})
        .catch(err => err);
};

export const findByActivityId = async (id: number): Promise<Video[]> => {
    const query = 'SELECT * FROM video WHERE activity_id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
        .then(data => {
			if (data?.length === 0) return {};
			return data[0];
		})
        .catch(err => err);
};

export const findByName = async (name: string): Promise<Video> => {
    let query = 'SELECT * FROM video WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
        .then(data => {
			if (data?.length === 0) return {};
			return data[0];
		})
        .catch(err => err);
};

export const save = async (video: Video): Promise<void> => {
    const query = 'INSERT INTO video SET ?';

    return execute(query, video)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, video: Video): Promise<Video | null> => {
    const query = `UPDATE video SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, video)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM video WHERE id = ${id}`;

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
