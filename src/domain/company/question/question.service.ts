import { Question } from './question.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Question[]> => {
    const query = 'SELECT * FROM question';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Question> => {
    const query = 'SELECT * FROM question WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByQuizId = async (id: number): Promise<Question[]> => {
    const query = 'SELECT * FROM question WHERE quiz_id = ?';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
        .then(data => data)
        .catch(err => err);
};

export const save = async (question: Question): Promise<void> => {
    const query = 'INSERT INTO question SET ?';

    return execute(query, question)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, question: Question): Promise<Question | null> => {
    const query = `UPDATE question SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, question)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM question WHERE id = ${id}`;

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
