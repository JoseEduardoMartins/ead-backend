import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Sector } from './sector.model';
import { findAll, findById, findByName, save, remove, update } from './sector.service';

const getSectors = (req: Request, res: Response) => {
    if(req.query.name){
        const name = String(req.query.name);
        getSectorByName(res, name);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getSectorByName = (res: Response, name: string) => {
    findByName(name)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getSector = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createSector = (req: Request, res: Response) => {
    const body: Sector = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateSector = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Sector = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteSector = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getSectors,
    getSector,
    createSector,
    updateSector,
    deleteSector
};
