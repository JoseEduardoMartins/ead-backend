import { body, param } from 'express-validator';
import { findByName } from './area.service';

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string.')
        .exists().withMessage('NAME can\'t be undefined.')
        .notEmpty().withMessage('NAME can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 255 }).withMessage('NAME can\'t be too large.')
        .trim()
        .custom(value =>
            findByName(value)
                .then(data => {
                    if (Object.keys(data).length) return Promise.reject('TECHNOLOGY already exists.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const description = () =>
    body('description')
        .isString().withMessage('DESCRIPTION must be string.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 500 }).withMessage('DESCRIPTION can\'t be too large.')
        .trim();

const validators = {
    id,
    name,
    description
};

export default validators;