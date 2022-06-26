import { body, param } from 'express-validator';
import { findById } from '../quiz/quiz.service'

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const quiz = () =>
    body('quiz_id')
        .isInt().withMessage('QUIZ ID must be number.')
        .exists().withMessage('QUIZ ID can\'t be undefined.')
        .notEmpty().withMessage('QUIZ ID can\'t be null.')
        .custom(value =>
            findById(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('QUIZ doesn\'t exist.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );
        
const description = () =>
    body('description')
        .isString().withMessage('DESCRIPTION must be string.')
        .exists().withMessage('DESCRIPTION can\'t be undefined.')
        .notEmpty().withMessage('DESCRIPTION can\'t be null.')
        .isLength({ max: 1024 }).withMessage('DESCRIPTION can\'t be too large.')
        .trim().escape();

const type = () =>
    body('type')
        .isString().withMessage('TYPE must be number.')
        .exists().withMessage('TYPE can\'t be undefined.')
        .notEmpty().withMessage('TYPE can\'t be null.')
        .isIn(['multipleChoice', 'singleChoice']).withMessage('TYPE can only contain keywords.');

const validators = {
    id,
    quiz,
    description,
    type
};

export default validators;