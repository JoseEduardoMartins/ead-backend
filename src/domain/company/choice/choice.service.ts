import { Choice } from './choice.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Choice[]> => {
    const query = 'SELECT * FROM choice';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Choice> => {
    const query = 'SELECT * FROM choice WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByQuestionId = async (id: number): Promise<Choice[]> => {
    const query = 'SELECT * FROM choice WHERE question_id = ?';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
        .then(data => data)
        .catch(err => err);
};

export const save = async (choice: Choice): Promise<void> => {
    const query = 'INSERT INTO choice SET ?';

    return execute(query, choice)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, choice: Choice): Promise<Choice | null> => {
    const query = `UPDATE choice SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, choice)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM choice WHERE id = ${id}`;

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
