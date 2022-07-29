import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Studying } from './studying.model';
import { findByFilters, findById, save, remove, update } from './studying.service';

const getStudies = (req: Request, res: Response) => {
    findByFilters(req.query)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getStudying = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createStudying = (req: Request, res: Response) => {
    const body: Studying = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateStudying = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Studying = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteStudying = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getStudies,
    getStudying,
    createStudying,
    updateStudying,
    deleteStudying
};
