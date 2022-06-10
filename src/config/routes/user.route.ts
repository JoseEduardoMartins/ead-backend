import { router } from '../routes';
import userCtrl from '../../domain/company/user/user.controller';
import config from '../config';

import validators from '../../domain/company/user/user.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${config.api_path}/users`, userCtrl.getUsers);

router.get(`${config.api_path}/users/:id`, validate(['id'], validators), userCtrl.getUser);

router.post(`${config.api_path}/users`, validate(['type_user', 'name', 'birth', 'gender', 'sector', 'phone', 'email', 'password'], validators), userCtrl.createUser);

router.put(`${config.api_path}/users/:id`, validate(['id', 'type_user', 'profile_picture', 'name', 'birth', 'gender', 'sector', 'phone', 'biography', 'about', 'linkedin', 'github', 'level', 'email', 'password', 'user_status'], validators), userCtrl.updateUser);

router.delete(`${config.api_path}/users/:id`, validate(['id'], validators), userCtrl.deleteUser);

export default router;
