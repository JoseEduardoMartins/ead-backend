import { router } from '../routes';
import topicCtrl from '../../domain/company/topic/topic.controller';
import { api } from '../config';

import validators from '../../domain/company/user/user.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/topics`, topicCtrl.getTopics);

router.get(`${api.path}/topics/:id`, validate(['id'], validators), topicCtrl.getTopic);

router.post(`${api.path}/topics`, validate(['type_user', 'name', 'birth', 'gender', 'sector', 'phone', 'level', 'email', 'password', 'isActive'], validators), topicCtrl.createTopic);

router.put(`${api.path}/topics/:id`, validate(['id', 'type_user', 'profile_picture', 'name', 'birth', 'gender', 'sector', 'phone', 'biography', 'about', 'linkedin', 'github', 'level', 'email', 'password', 'isActive'], validators), topicCtrl.createTopic);

router.delete(`${api.path}/topics/:id`, validate(['id'], validators), topicCtrl.deleteTopic);

export default router;
