import { Quiz } from './quiz.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Quiz[]> => {
    const query = 'SELECT * FROM quiz';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Quiz> => {
    const query = 'SELECT * FROM quiz WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByActivityId = async (id: number): Promise<Quiz[]> => {
    const query = 'SELECT * FROM quiz WHERE activity_id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
        .then(data => {
			if (data?.length === 0) return {};
			return data[0];
		})
        .catch(err => err);
};

export const save = async (quiz: Quiz): Promise<void> => {
    const query = 'INSERT INTO quiz SET ?';

    return execute(query, quiz)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, quiz: Quiz): Promise<Quiz | null> => {
    const query = `UPDATE quiz SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, quiz)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM quiz WHERE id = ${id}`;

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
