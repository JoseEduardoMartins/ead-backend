import { body, param } from 'express-validator';
import { findByName } from './course.service';

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
        .isLength({ max: 255 }).withMessage('NAME can\'t be too large.')
        .trim().escape()
        .custom(value =>
            findByName(value)
                .then(data => {
                    if (Object.keys(data).length) {
                        return Promise.reject('COURSE already exists.');
                    }
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

const date_update = () =>
    body('description')
        .isDate().withMessage('DATE UPDATE must be date.')
        .trim().escape();

const level = () =>
    body('level')
        .isString().withMessage('LEVEL must be string.')
        .exists().withMessage('LEVEL can\'t be undefined.')
        .notEmpty().withMessage('LEVEL can\'t be null.')
        .isIn(['basic', 'intermediary', 'advanced']).withMessage('LEVEL can only contain keywords.');

const time = () =>
    body('time')
        .isInt().withMessage('TIME must be number.')
        .exists().withMessage('TIME can\'t be undefined.')
        .notEmpty().withMessage('TIME can\'t be null.');

const technology_id = () =>
    body('technology_id')
        .isInt().withMessage('TECHNOLOGY ID must be number.');

const isActive = () =>
    body('isActive')
        .isBoolean().withMessage('COURSE STATUS must be number.')
        .exists().withMessage('COURSE STATUS can\'t be undefined.')
        .notEmpty().withMessage('COURSE STATUS can\'t be null.');

const validators = {
    id,
    name,
    description,
    date_update,
    level,
    time,
    technology_id,
    isActive
};

export default validators;