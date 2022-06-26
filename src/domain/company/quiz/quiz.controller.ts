import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Quiz } from './quiz.model';
import { findAll, findById, findByActivityId, save, remove, update } from './quiz.service';

const getQuestionnaires = (req: Request, res: Response) => {
    if(req.query.activity_id){
        const id = Number(req.query.activity_id);
        getQuizByActivityId(res, id);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getQuizByActivityId = (res: Response, id: number) => {
    findByActivityId(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getQuiz = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createQuiz = (req: Request, res: Response) => {
    const body: Quiz = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateQuiz = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Quiz = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteQuiz = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getQuestionnaires,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz
};
