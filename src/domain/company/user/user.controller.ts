import { Request, Response } from 'express';
import { ApiError } from '../../application/error/api-error.model';
import { User } from './user.model';
import { findAll, findById, findByPhone, findByEmail, findByFilters, save, remove, update } from './user.service';

const getUsers = (req: Request, res: Response) => {
    if(Object.keys(req.query).length > 1){
        getUserByFilters(res, req.query);
        return;
    } else if(req.query.phone){
        const phone = String(req.query.phone);
        getUserByPhone(res, phone);
        return;
    } else if(req.query.email){
        const email = String(req.query.email);
        getUserByEmail(res, email);
        return;
    }
    findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getUserByFilters = (res: Response, filters: object) => {
    findByFilters(filters)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getUserByPhone = (res: Response, phone: string) => {
    findByPhone(phone)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getUserByEmail = (res: Response, email: string) => {
    findByEmail(email)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const getUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const createUser = (req: Request, res: Response) => {
    const body: User = req.body;

    save(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => (res.status(500).json(new ApiError(err.message, err))));
};

const updateUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body: User = req.body;

    update(id, body)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(200).json();
        })
		.catch(err => res.status(500).json(new ApiError(err.message, err)));
};

const deleteUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    remove(id)
        .then(data => {
            if (data === null) return res.status(404).json({ message: 'Not found' });

            return res.status(204).json();
        })
        .catch(err => res.status(500).json(new ApiError(err.message, err)));
};

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
