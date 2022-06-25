import { body, param } from 'express-validator';
import { findById } from '../theme/theme.service'

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const theme = () =>
    body('theme_id')
        .isInt().withMessage('TOPIC ID must be number.')
        .exists().withMessage('TOPIC ID can\'t be undefined.')
        .notEmpty().withMessage('TOPIC ID can\'t be null.')
        .custom(value =>
            findById(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('THEME doesn\'t exist.');
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

const type = () =>
    body('type')
        .isString().withMessage('TYPE must be string.')
        .exists().withMessage('TYPE can\'t be undefined.')
        .notEmpty().withMessage('TYPE can\'t be null.')
        .isIn(['quiz', 'video']).withMessage('TYPE can only contain keywords.');

const position = () =>
    body('position')
        .isInt().withMessage('ID must be number.');

const validators = {
    id,
    theme,
    name,
    type,
    position
};

export default validators;