import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Theme } from './theme.model';
import { findAll, findById, findByName, save, remove, update } from './theme.service';

const getTopics = (req: Request, res: Response) => {
    if(req.query.name){
        const name = String(req.query.name);
        getTopicByName(res, name);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getTopicByName = (res: Response, name: string) => {
    findByName(name)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getTopic = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createTopic = (req: Request, res: Response) => {
    const body: Theme = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateTopic = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Theme = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteTopic = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getTopics,
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic
};