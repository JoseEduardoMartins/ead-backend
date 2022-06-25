import { router } from '../routes';
import activityCtrl from '../../domain/company/activity/activity.controller';
import { api } from '../config';

import validators from '../../domain/company/activity/activity.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/activities`, activityCtrl.getActivities);

router.get(`${api.path}/activities/:id`, validate(['id'], validators), activityCtrl.getActivity);

router.post(`${api.path}/activities`, validate(['name', 'description'], validators), activityCtrl.createActivity);

router.put(`${api.path}/activities/:id`, validate(['id', 'name', 'description'], validators), activityCtrl.updateActivity);

router.delete(`${api.path}/activities/:id`, validate(['id'], validators), activityCtrl.deleteActivity);

export default router;