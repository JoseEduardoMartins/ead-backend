import { router } from '../routes';
import controller from '../../domain/company/activity/activity.controller';
import { api } from '../config';

import validators from '../../domain/company/activity/activity.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/activities`, controller.getActivities);

router.get(`${api.path}/activities/:id`, validate(['id'], validators), controller.getActivity);

router.post(`${api.path}/activities`, validate(['course_id', 'name', 'type'], validators), controller.createActivity);

router.put(`${api.path}/activities/:id`, validate([], validators), controller.updateActivity);

router.delete(`${api.path}/activities/:id`, validate(['id'], validators), controller.deleteActivity);

export default router;
