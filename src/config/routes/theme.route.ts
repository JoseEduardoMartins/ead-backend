import { router } from '../routes';
import themeCtrl from '../../domain/company/theme/theme.controller';
import { api } from '../config';

import validators from '../../domain/company/theme/theme.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/themes`, themeCtrl.getTopics);

router.get(`${api.path}/themes/:id`, validate(['id'], validators), themeCtrl.getTopic);

router.post(`${api.path}/themes`, validate(['course', 'name', 'description'], validators), themeCtrl.createTopic);

router.put(`${api.path}/themes/:id`, validate(['id', 'course', 'name', 'description'], validators), themeCtrl.updateTopic);

router.delete(`${api.path}/themes/:id`, validate(['id'], validators), themeCtrl.deleteTopic);

export default router;
