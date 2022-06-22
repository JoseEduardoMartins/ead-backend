import { router } from '../routes';
import topicCtrl from '../../domain/company/topic/topic.controller';
import { api } from '../config';

import validators from '../../domain/company/topic/topic.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/topics`, topicCtrl.getTopics);

router.get(`${api.path}/topics/:id`, validate(['id'], validators), topicCtrl.getTopic);

router.post(`${api.path}/topics`, validate(['course', 'name', 'description'], validators), topicCtrl.createTopic);

router.put(`${api.path}/topics/:id`, validate(['id', 'course', 'name', 'description'], validators), topicCtrl.updateTopic);

router.delete(`${api.path}/topics/:id`, validate(['id'], validators), topicCtrl.deleteTopic);

export default router;
