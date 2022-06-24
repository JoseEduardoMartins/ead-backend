import { body, param } from 'express-validator';
import { findByName } from './theme.service';

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const topic = () =>
    body('topic_id')
        .isInt().withMessage('TOPIC ID must be number.')
        .exists().withMessage('TOPIC ID can\'t be undefined.')
        .notEmpty().withMessage('TOPIC ID can\'t be null.');
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string.')
        .exists().withMessage('NAME can\'t be undefined.')
        .notEmpty().withMessage('NAME can\'t be null.')
        .isLength({ max: 255 }).withMessage('NAME can\'t be too large.')
        .trim().escape()
        .custom(value =>
            findByName(value)
                .then(data => {
                    if (Object.keys(data).length) {
                        return Promise.reject('THEME already exists.');
                    }
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const description = () =>
    body('description')
        .isString().withMessage('DESCRIPTION must be string.')
        .isLength({ max: 1024 }).withMessage('DESCRIPTION can\'t be too large.')
        .trim().escape();

const validators = {
    id,
    topic,
    name,
    description
};

export default validators;