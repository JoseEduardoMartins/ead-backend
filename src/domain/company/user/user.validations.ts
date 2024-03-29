import md5 from 'md5';
import { api } from '../../../config/config';
import { body, param } from 'express-validator';
import { findByPhone, findByEmail } from './user.service';
import { findById } from '../area/area.service';

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .exists().withMessage('ID can\'t be undefined.')
        .notEmpty().withMessage('ID can\'t be null.');

const type_user = () =>
    body('type_user')
        .isString().withMessage('TYPE USER must be string.')
        .exists().withMessage('TYPE USER can\'t be undefined.')
        .notEmpty().withMessage('TYPE USER can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isIn(['admin', 'subAdmin', 'teacher', 'student'])
        .trim();

const profile_picture = () =>
    body('profile_picture')
        .isString().withMessage('PROFILE PICTURE must be string.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 200 }).withMessage('PROFILE PICTURE can\'t be too large.')
        .trim();
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string.')
        .exists().withMessage('NAME can\'t be undefined.')
        .notEmpty().withMessage('NAME can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 200 }).withMessage('NAME can\'t be too large.')
        .trim();

const birth = () =>
    body('birth')
        .isDate().withMessage('BIRTH must be date.')
        .exists().withMessage('BIRTH can\'t be undefined.')
        .notEmpty().withMessage('BIRTH can\'t be null.');

const gender = () =>
    body('gender')
        .isString().withMessage('GENDER must be string.')
        .exists().withMessage('GENDER can\'t be undefined.')
        .notEmpty().withMessage('GENDER can\'t be null.')
        .isIn(['feminine', 'masculine', 'other']);

const area_id = () =>
    body('area_id')
        .isInt().withMessage('AREA ID must be number.')
        .exists().withMessage('AREA ID can\'t be undefined.')
        .notEmpty().withMessage('AREA ID can\'t be null.')
        .custom(value =>
            findById(value)
                .then(data => {
                    if (!Object.keys(data).length) return Promise.reject('AREA doesn\'t exist.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const phone = () =>
    body('phone')
        .isString().withMessage('PHONE must be string.')
        .exists().withMessage('PHONE can\'t be undefined.')
        .notEmpty().withMessage('PHONE can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 20 }).withMessage('PHONE can\'t be too large.')
        .trim()
        .custom(value =>
            findByPhone(value)
                .then(data => {
                    if (Object.keys(data).length) {
                        return Promise.reject('PHONE already exists.');
                    }
                }).catch(err => {
                    return Promise.reject(err);
                })
        );
 
const biography = () =>
    body('biography')
        .isString().withMessage('BIOGRAPHY must be string.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 200 }).withMessage('BIOGRAPHY can\'t be too large.')
        .trim();
 
const about = () =>
    body('about')
        .isString().withMessage('ABOUT must be string.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 1000 }).withMessage('ABOUT can\'t be too large.')
        .trim(); 
 
const linkedin = () =>
    body('linkedin')
        .isString().withMessage('LINKEDIN must be string.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 500 }).withMessage('LINKEDIN can\'t be too large.')
        .trim();

const github = () =>
    body('github')
        .isString().withMessage('GITHUB must be string.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 500 }).withMessage('GITHUB can\'t be too large.')
        .trim();

const level = () =>
    body('level')
        .isInt().withMessage('LEVEL must be number.')
        .exists().withMessage('LEVEL can\'t be undefined.')
        .notEmpty().withMessage('LEVEL can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ min: 0 }).withMessage('LEVEL can\'t be too small.')
        .trim();

const email = () =>
    body('email')
        .isString().withMessage('EMAIL must be string.')
        .isEmail().normalizeEmail().withMessage('EMAIL is invalid.')
        .exists().withMessage('EMAIL can\'t be undefined.')
        .notEmpty().withMessage('EMAIL can\'t be null.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 200 }).withMessage('EMAIL can\'t be too large.')
        .trim()
        .custom(value =>
            findByEmail(value)
                .then(data => {
                    if (Object.keys(data).length)
                        return Promise.reject('EMAIL already exists.');
                }).catch(err => {
                    return Promise.reject(err);
                })
        );

const password = () =>
    body('password')
        .isString().withMessage('PASSWORD must be string.')
        .exists().withMessage('PASSWORD can\'t be undefined.')
        .notEmpty().withMessage('PASSWORD can\'t be null.')
        .isLength({ min: 8 }).withMessage('PASSWORD can\'t be too small.')
        .bail()
        .customSanitizer(value => value.replace(/'/g, '').replace(/"/g, ''))
        .isLength({ max: 200 }).withMessage('PASSWORD can\'t be too large.')
        .trim()
        .customSanitizer(value => {
            return md5(value + api.key);
        });
        
const isActive = () =>
    body('isActive')
        .isBoolean().withMessage('USER STATUS must be boolean.')
        .exists().withMessage('USER STATUS can\'t be undefined.')
        .notEmpty().withMessage('USER STATUS can\'t be null.');

const validators = {
    id,
    type_user,
    profile_picture,
    name,
    birth,
    gender,
    area_id,
    phone,
    biography,
    about,
    linkedin,
    github,
    level,
    email,
    password,
    isActive
};

export default validators;