import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Course } from './course.model';
import { findAll, findById, findByName, findByFilters, save, remove, update } from './course.service';

const getCourses = (req: Request, res: Response) => {
    if(Object.keys(req.query).length > 1){
        getCourseByFilters(res, req.query);
        return;
    } else if(req.query.name){
        const name = String(req.query.name);
        getCourseByName(res, name);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getCourseByFilters = (res: Response, filters: object) => {
    findByFilters(filters)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getCourseByName = (res: Response, name: string) => {
    findByName(name)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getCourse = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createCourse = (req: Request, res: Response) => {
    const body: Course = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateCourse = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Course = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteCourse = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};
