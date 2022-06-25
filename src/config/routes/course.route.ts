import { router } from '../routes';
import courseCtrl from '../../domain/company/course/course.controller';
import { api } from '../config';

import validators from '../../domain/company/course/course.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/courses`, courseCtrl.getCourses);

router.get(`${api.path}/courses/:id`, validate(['id'], validators), courseCtrl.getCourse);

router.post(`${api.path}/courses`, validate(['user', 'name', 'description', 'date_update', 'level', 'time', 'area', 'isActive'], validators), courseCtrl.createCourse);

router.put(`${api.path}/courses/:id`, validate(['id', 'user', 'name', 'description', 'date_update', 'level', 'time', 'area', 'isActive'], validators), courseCtrl.updateCourse);

router.delete(`${api.path}/courses/:id`, validate(['id'], validators), courseCtrl.deleteCourse);

export default router;