import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Area } from './area.model';
import { findAll, findById, findByName, save, remove, update } from './area.service';

const getAreas = (req: Request, res: Response) => {
    if(req.query.name){
        const name = String(req.query.name);
        getAreaByName(res, name);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getAreaByName = (res: Response, name: string) => {
    findByName(name)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getArea = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createArea = (req: Request, res: Response) => {
    const body: Area = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateArea = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Area = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteArea = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getAreas,
    getArea,
    createArea,
    updateArea,
    deleteArea
};
