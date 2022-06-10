export type User = {
    name: string;
}

import { body, param } from 'express-validator';

const id = () =>
    param('id')
        .isInt().withMessage('ID must be number.')
        .not().isEmpty().withMessage('ID can\'t be null.');

const type_user = () =>
    body('type_user')
        .isString().withMessage('TYPE USER must be string.')
        .not().isEmpty().withMessage('TYPE USER can\'t be null.')
        .isIn(['admin', 'subAdmin', 'teacher', 'student'])
        .trim().escape();

const profile_picture = () =>
    body('profile_picture')
        .isString().withMessage('PROFILE PICTURE must be string.')
        .not().isEmpty().withMessage('PROFILE PICTURE can\'t be null.')
        .isLength({ max: 200 }).withMessage('very large PROFILE PICTURE.')
        .trim().escape();
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string.')
        .not().isEmpty().withMessage('NAME can\'t be null.')
        .isLength({ max: 200 }).withMessage('very large NAME.')
        .trim().escape();

const birth = () =>
    body('birth')
        .isDate().withMessage('BIRTH must be date.')
        .not().isEmpty().withMessage('BIRTH can\'t be null.');

const gender = () =>
    body('gender')
        .isString().withMessage('GENDER must be string.')
        .not().isEmpty().withMessage('GENDER can\'t be null.')
        .isIn(['feminine', 'masculine', 'other']);

const sector = () =>
    body('sector')
        .isInt().withMessage('SECTOR must be number.')
        .not().isEmpty().withMessage('SECTOR can\'t be null.')

const phone = () =>
    body('phone')
        .isString().withMessage('PHONE must be string.')
        .not().isEmpty().withMessage('PHONE can\'t be null.')
        .isLength({ max: 20 }).withMessage('very large PHONE.')
        .trim().escape();
 
const biography = () =>
    body('biography')
        .isString().withMessage('BIOGRAPHY must be string.')
        .isLength({ max: 200 }).withMessage('very large BIOGRAPHY.')
        .trim().escape();
 
const about = () =>
    body('about')
        .isString().withMessage('ABOUT must be string.')
        .isLength({ max: 1000 }).withMessage('very large ABOUT.')
        .trim().escape(); 
 
const linkedin = () =>
    body('linkedin')
        .isString().withMessage('LINKEDIN must be string.')
        .isLength({ max: 500 }).withMessage('very large LINKEDIN.')
        .trim().escape();

const github = () =>
    body('github')
        .isString().withMessage('GITHUB must be string.')
        .isLength({ max: 500 }).withMessage('very large GITHUB.')
        .trim().escape();

const level = () =>
    body('level')
        .isInt().withMessage('LEVEL must be number.')
        .isLength({ min: 0 }).withMessage('very small LEVEL.')
        .trim().escape();

const email = () =>
    body('email')
        .isString().withMessage('EMAIL must be string.')
        .isEmail().normalizeEmail().withMessage('EMAIL is invalid.')
        .isLength({ max: 200 }).withMessage('very large EMAIL.')
        .trim().escape();

const password = () =>
    body('password')
        .isString().withMessage('PASSWORD must be string.')
        .isLength({ min: 8 }).withMessage('very small PASSWORD.')
        .isLength({ max: 200 }).withMessage('very large PASSWORD.')
        .trim().escape();
        
const user_status = () =>
    body('user_status')
        .isBoolean().withMessage('USER STATUS must be boolean.')

const validators = {
    id,
    type_user,
    profile_picture,
    name,
    birth,
    gender,
    sector,
    phone,
    biography,
    about,
    linkedin,
    github,
    level,
    email,
    password,
    user_status
};

export default validators;