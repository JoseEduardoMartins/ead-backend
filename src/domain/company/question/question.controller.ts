import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { Question } from './question.model';
import { findAll, findById, findByQuizId, save, remove, update } from './question.service';

const getQuestions = (req: Request, res: Response) => {
    if(req.query.quiz_id){
        const id = Number(req.query.quiz_id);
        getQuestionByQuizId(res, id);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getQuestionByQuizId = (res: Response, id: number) => {
    findByQuizId(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getQuestion = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createQuestion = (req: Request, res: Response) => {
    const body: Question = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateQuestion = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: Question = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteQuestion = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
};
