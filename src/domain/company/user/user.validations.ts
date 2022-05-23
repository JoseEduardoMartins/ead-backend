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
        .isString().withMessage('TYPE USER must be string')
        .not().isEmpty().withMessage('TYPE USER can\'t be null.')
        .isIn(['admin', 'subAdmin', 'teacher', 'student'])
        .trim().escape();

const profile_picture = () =>
    body('profile_picture')
        .isString().withMessage('PROFILE PICTURE must be string')
        .not().isEmpty().withMessage('PROFILE PICTURE can\'t be null.')
        .isLength({ max: 200 }).withMessage('very large PROFILE PICTURE.')
        .trim().escape();
        
const name = () =>
    body('name')
        .isString().withMessage('NAME must be string')
        .not().isEmpty().withMessage('NAME can\'t be null.')
        .isLength({ max: 200 }).withMessage('very large NAME.')
        .trim().escape();

const birth = () =>
    body('birth')
        .isDate().withMessage('BIRTH must be date')
        .not().isEmpty().withMessage('BIRTH can\'t be null.');

const gender = () =>
    body('gender')
        .isString().withMessage('GENDER must be string')
        .not().isEmpty().withMessage('GENDER can\'t be null.')
        .isIn(['feminine', 'masculine', 'other']);

const sector = () =>
    body('sector')
        .isInt().withMessage('SECTOR must be number')
        .not().isEmpty().withMessage('SECTOR can\'t be null.')

const phone = () =>
    body('phone')
        .isInt().withMessage('PHONE must be string')
        .not().isEmpty().withMessage('PHONE can\'t be null.')
        .isLength({ max: 20 }).withMessage('very large PHONE.')
        .trim().escape();
    
    
    number: string;
    biography: string;
    about: string;
    linkedin: string;
    github: string;
    email: string;
    password: string;
    level: number;
    token: string;
    experes_token: Date;
    user_status: number;

const validators = {
    id,
    type_user,
    profile_picture,
    name,
    birth,
    gender,
    sector
};

export default validators;