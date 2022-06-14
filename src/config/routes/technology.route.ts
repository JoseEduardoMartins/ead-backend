import { router } from '../routes';
import technologyCtrl from '../../domain/company/technology/technology.controller';
import { api } from '../config';

import validators from '../../domain/company/technology/technology.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/technologies`, technologyCtrl.getTechnologies);

router.get(`${api.path}/technologies/:id`, validate(['id'], validators), technologyCtrl.getTechnology);

router.post(`${api.path}/technologies`, validate(['name', 'description'], validators), technologyCtrl.createTechnology);

router.put(`${api.path}/technologies/:id`, validate(['id', 'name', 'description'], validators), technologyCtrl.updateTechnology);

router.delete(`${api.path}/technologies/:id`, validate(['id'], validators), technologyCtrl.deleteTechnology);

export default router;