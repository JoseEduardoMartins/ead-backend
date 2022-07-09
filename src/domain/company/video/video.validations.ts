import { body, param } from 'express-validator';
import { findById } from '../activity/activity.service';

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
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string.')
        .exists().withMessage('NAME can\'t be undefined.')
        .notEmpty().withMessage('NAME can\'t be null.')
        .isLength({ max: 255 }).withMessage('NAME can\'t be too large.')
        .trim().escape();

const url = () =>
    body('url')
        .isURL().withMessage('URL must be url.')
        .exists().withMessage('URL can\'t be undefined.')
        .notEmpty().withMessage('URL can\'t be null.')
        .isLength({ max: 1024 }).withMessage('URL can\'t be too large.')
        .trim();

const validators = {
    id,
    activity_id,
    name,
    url
};

export default validators;