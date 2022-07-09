import { router } from '../routes';
import controller from '../../domain/company/theme/theme.controller';
import { api } from '../config';

import validators from '../../domain/company/theme/theme.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/themes`, controller.getThemes);

router.get(`${api.path}/themes/:id`, validate(['id'], validators), controller.getTheme);

router.post(`${api.path}/themes`, validate(['course_id', 'name'], validators), controller.createTheme);

router.put(`${api.path}/themes/:id`, validate([], validators), controller.updateTheme);

router.delete(`${api.path}/themes/:id`, validate(['id'], validators), controller.deleteTheme);

export default router;
