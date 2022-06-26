import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Choice } from './choice.model';
import { findAll, findById, findByQuestionId, save, remove, update } from './choice.service';

const getChoices = (req: Request, res: Response) => {
    if(req.query.question_id){
        const id = Number(req.query.question_id);
        getChoiceByQuestionId(res, id);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getChoiceByQuestionId = (res: Response, id: number) => {
    findByQuestionId(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getChoice = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createChoice = (req: Request, res: Response) => {
    const body: Choice = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateChoice = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Choice = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteChoice = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getChoices,
    getChoice,
    createChoice,
    updateChoice,
    deleteChoice
};
