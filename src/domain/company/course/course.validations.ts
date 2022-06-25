import { body, param } from 'express-validator';
import { findByName } from './course.service';
import { findById as findUserById } from '../user/user.service'
import { findById as findAreaById } from '../area/area.service';

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const user = () =>
    body('user_id')
        .isInt().withMessage('USER ID must be number.')
        .exists().withMessage('USER ID can\'t be undefined.')
        .notEmpty().withMessage('USER ID can\'t be null.')
        .custom(value =>
            findUserById(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('USER doesn\'t exist.');
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
        .trim().escape()
        .custom(value =>
            findByName(value)
                .then(data => {
                    if (Object.keys(data).length) return Promise.reject('COURSE already exists.');
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
    body('date_update')
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

const area = () =>
    body('area_id')
        .isInt().withMessage('AREA ID must be number.')
        .exists().withMessage('AREA ID can\'t be undefined.')
        .notEmpty().withMessage('AREA ID can\'t be null.')
        .custom(value =>
            findAreaById(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('AREA doesn\'t exist.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const isActive = () =>
    body('isActive')
        .isBoolean().withMessage('COURSE STATUS must be number.')
        .exists().withMessage('COURSE STATUS can\'t be undefined.')
        .notEmpty().withMessage('COURSE STATUS can\'t be null.');

const validators = {
    id,
    user,
    name,
    description,
    date_update,
    level,
    time,
    area,
    isActive
};

export default validators;