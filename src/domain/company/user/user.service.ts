import { User } from './user.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<User[]> => {
    const query = 'SELECT * FROM user';

    return execute(query, {}).then(data => data).catch(err => err);
}

export const findById = async (id: number): Promise<User> => {
    const query = 'SELECT * FROM user WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
}

export const save = async (user: User): Promise<void> => {
    const query = 'INSERT INTO user SET ?';

    return execute(query, user)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, user: User): Promise<User | null> => {
    const query = `UPDATE user SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, user)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM user WHERE id = ${id}`;

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
