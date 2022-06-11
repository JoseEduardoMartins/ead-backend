import { User } from './user.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<User[]> => {
    const query = 'SELECT * FROM user';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<User> => {
    const query = 'SELECT * FROM user WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByPhone = async (phone: string): Promise<User> => {
    const query = 'SELECT * FROM user WHERE phone = ? LIMIT 1';

    if (!validators['string'](phone)) throw new Error('Param {phone} is invalid');

    return execute(query, phone)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByEmail = async (email: string): Promise<User> => {
    const query = 'SELECT * FROM user WHERE email = ? LIMIT 1';

    if (!validators['string'](email)) throw new Error('Param {email} is invalid');

    return execute(query, email)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByFilters = async (filters: object): Promise<User> => {
    let query = 'SELECT * FROM user WHERE ';

    const elements = Object.entries(filters);

    elements.forEach((element, index) => {
        query += `${element[0]} = '${element[1]}' ${(index < elements.length-1) ? 'AND ': ';'}`;
    });

    return execute(query, {})
        .then(data => data)
        .catch(err => err);
};

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
