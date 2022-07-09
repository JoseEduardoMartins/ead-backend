import { router } from '../routes';
import controller from '../../domain/company/choice/choice.controller';
import { api } from '../config';

import validators from '../../domain/company/choice/choice.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/choices`, controller.getChoices);

router.get(`${api.path}/choices/:id`, validate(['id'], validators), controller.getChoice);

router.post(`${api.path}/choices`, validate(['question_id', 'description', 'type'], validators), controller.createChoice);

router.put(`${api.path}/choices/:id`, validate([], validators), controller.updateChoice);

router.delete(`${api.path}/choices/:id`, validate(['id'], validators), controller.deleteChoice);

export default router;