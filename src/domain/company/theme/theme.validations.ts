import { body, param } from 'express-validator';
import { findById as findByCourseId } from '../course/course.service';
import { findById as findByTopicId } from '../topic/topic.service';

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
                    if (!Object.keys(data).length) return Promise.reject('COURSE ID doesn\'t exist.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const topic_id = () =>
    body('topic_id')
        .isInt().withMessage('TOPIC ID must be number.')
        .custom(value =>
            findByTopicId(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('TOPIC ID doesn\'t exist.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string.')
        .exists().withMessage('NAME can\'t be undefined.')
        .notEmpty().withMessage('NAME can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 255 }).withMessage('NAME can\'t be too large.')
        .trim();

const description = () =>
    body('description')
        .isString().withMessage('DESCRIPTION must be string.')
        .isLength({ max: 1024 }).withMessage('DESCRIPTION can\'t be too large.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .trim();

const position = () =>
    body('position')
        .isInt().withMessage('ID must be number.');

const validators = {
    id,
    course_id,
    topic_id,
    name,
    description,
    position
};

export default validators;