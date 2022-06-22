import { router } from '../routes';
import userCtrl from '../../domain/company/user/user.controller';
import { api } from '../config';

import validators from '../../domain/company/user/user.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/users`, userCtrl.getUsers);

router.get(`${api.path}/users/:id`, validate(['id'], validators), userCtrl.getUser);

router.post(`${api.path}/users`, validate(['type_user', 'name', 'birth', 'gender', 'area', 'phone', 'level', 'email', 'password', 'isActive'], validators), userCtrl.createUser);

router.put(`${api.path}/users/:id`, validate(['id', 'type_user', 'profile_picture', 'name', 'birth', 'gender', 'area', 'phone', 'biography', 'about', 'linkedin', 'github', 'level', 'email', 'password', 'isActive'], validators), userCtrl.updateUser);

router.delete(`${api.path}/users/:id`, validate(['id'], validators), userCtrl.deleteUser);

export default router;
