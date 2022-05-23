import { router } from '../routes';
import userCtrl from '../../domain/company/user/user.controller';
import config from '../config';

import validators from '../../domain/company/user/user.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${config.api_path}/users`, userCtrl.getUsers);

router.get(`${config.api_path}/users/:id`, validate(['id'], validators), userCtrl.getUser);

router.post(`${config.api_path}/users`, validate(['name'], validators), userCtrl.createUser);

router.put(`${config.api_path}/users/:id`, validate(['id', 'name'], validators), userCtrl.updateUser);

router.delete(`${config.api_path}/users/:id`, validate(['id'], validators), userCtrl.deleteUser);

export default router;
