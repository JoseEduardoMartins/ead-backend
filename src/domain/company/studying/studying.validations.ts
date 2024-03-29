import { body, param } from 'express-validator';
import { findById } from '../activity/activity.service'

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const activity_id = () =>
    body('activity_id')
        .isInt().withMessage('ACTIVITY ID must be number.')
        .exists().withMessage('ACTIVITY ID can\'t be undefined.')
        .notEmpty().withMessage('ACTIVITY ID can\'t be null.')
        .custom(value =>
            findById(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('ACTIVITY doesn\'t exist.');
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

const amountQuestion = () =>
    body('amountQuestion')
        .isInt().withMessage('AMOUNT QUESTION must be number.')
        .exists().withMessage('AMOUNT QUESTION can\'t be undefined.')
        .notEmpty().withMessage('AMOUNT QUESTION can\'t be null.');

const validators = {
    id,
    activity_id,
    description,
    amountQuestion
};

export default validators;