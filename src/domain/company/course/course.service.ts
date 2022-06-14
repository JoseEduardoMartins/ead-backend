import { Course } from './course.model';
import { execute } from '../../../config/mysql';

export const findAll = async (): Promise<Course[]> => {
    const query = 'SELECT * FROM course';

    return execute(query, {}).then(data => data).catch(err => err);
};

export const findById = async (id: number): Promise<Course> => {
    const query = 'SELECT * FROM course WHERE id = ? LIMIT 1';

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, id)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByName = async (name: string): Promise<Course> => {
    const query = 'SELECT * FROM course WHERE name = ? LIMIT 1';

    if (!validators['string'](name)) throw new Error('Param {name} is invalid');

    return execute(query, name)
		.then(data => {
			if (data?.length === 0) return {};
			return data[0];
		}).catch(err => err);
};

export const findByFilters = async (filters: object): Promise<Course> => {
    let query = 'SELECT * FROM course WHERE ';

    const elements = Object.entries(filters);

    elements.forEach((element, index) => {
        query += `${element[0]} = '${element[1]}' ${(index < elements.length-1) ? 'AND ': ';'}`;
    });

    return execute(query, {})
        .then(data => data)
        .catch(err => err);
};

export const save = async (course: Course): Promise<void> => {
    const query = 'INSERT INTO course SET ?';

    return execute(query, course)
        .then(data => {
            const { insertId } = data;
            return { id: insertId };
        }).catch(err => err);
};

export const update = async (id: number, course: Course): Promise<Course | null> => {
    const query = `UPDATE course SET ? WHERE id = ${id}`;

    if (!validators['number'](id)) throw new Error('Param {id} is invalid');

    return execute(query, course)
        .then(data => {
            if (data?.affectedRows === 0) return null;
            return {};
        }).catch(err => err);
};

export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM course WHERE id = ${id}`;

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
