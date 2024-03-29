import { body, param } from 'express-validator';
import { findById } from '../question/question.service'

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const question_id = () =>
    body('question_id')
        .isInt().withMessage('QUESTION ID must be number.')
        .exists().withMessage('QUESTION ID can\'t be undefined.')
        .notEmpty().withMessage('QUESTION ID can\'t be null.')
        .custom(value =>
            findById(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('QUESTION doesn\'t exist.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const description = () =>
    body('description')
        .isString().withMessage('DESCRIPTION must be string.')
        .exists().withMessage('DESCRIPTION can\'t be undefined.')
        .notEmpty().withMessage('DESCRIPTION can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 1024 }).withMessage('DESCRIPTION can\'t be too large.')
        .trim();

const type = () =>
    body('type')
        .isBoolean().withMessage('TYPE must be number.')
        .exists().withMessage('TYPE can\'t be undefined.')
        .notEmpty().withMessage('TYPE can\'t be null.');

const validators = {
    id,
    question_id,
    description,
    type
};

export default validators;