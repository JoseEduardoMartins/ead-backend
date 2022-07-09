import { body, param } from 'express-validator';
import { findById as findByCourseId } from '../course/course.service';
import { findById as findByThemeId } from '../theme/theme.service'

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const course_id = () =>
    body('course_id')
        .isInt().withMessage('COURSE ID must be number.')
        .exists().withMessage('COURSE ID can\'t be undefined.')
        .notEmpty().withMessage('COURSE ID can\'t be null.')
        .custom(value =>
            findByCourseId(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('COURSE doesn\'t exist.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const theme_id = () =>
    body('theme_id')
        .isInt().withMessage('THEME ID must be number.')
        .custom(value =>
            findByThemeId(value)
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
        .isInt().withMessage('POSITION must be number.');

const validators = {
    id,
    course_id,
    theme_id,
    name,
    type,
    position
};

export default validators;