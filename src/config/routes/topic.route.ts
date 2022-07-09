import { router } from '../routes';
import controller from '../../domain/company/topic/topic.controller';
import { api } from '../config';

import validators from '../../domain/company/topic/topic.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/topics`, controller.getTopics);

router.get(`${api.path}/topics/:id`, validate(['id'], validators), controller.getTopic);

router.post(`${api.path}/topics`, validate(['course_id', 'name'], validators), controller.createTopic);

router.put(`${api.path}/topics/:id`, validate([], validators), controller.updateTopic);

router.delete(`${api.path}/topics/:id`, validate(['id'], validators), controller.deleteTopic);

export default router;
