import { body, param, query } from 'express-validator';
//import { findByFilters } from './topic.service';

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const course_id = () =>
    query('course_id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string.')
        .exists().withMessage('NAME can\'t be undefined.')
        .notEmpty().withMessage('NAME can\'t be null.')
        .isLength({ max: 255 }).withMessage('NAME can\'t be too large.')
        .trim().escape();
        // .custom(value =>
        //     findByFilters(value)
        //         .then(data => {
        //             if (Object.keys(data).length) {
        //                 return Promise.reject('TECHNOLOGY already exists.');
        //             }
        //         }).catch(err => {
        //             return Promise.reject(err);
        //         })
        // );

const validators = {
    id,
    course_id,
    name,
};

export default validators;