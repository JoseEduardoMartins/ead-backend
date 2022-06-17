import { router } from '../routes';
import areaCtrl from '../../domain/company/area/area.controller';
import { api } from '../config';

import validators from '../../domain/company/area/area.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/areas`, areaCtrl.getAreas);

router.get(`${api.path}/areas/:id`, validate(['id'], validators), areaCtrl.getArea);

router.post(`${api.path}/areas`, validate(['name', 'description'], validators), areaCtrl.createArea);

router.put(`${api.path}/areas/:id`, validate(['id', 'name', 'description'], validators), areaCtrl.updateArea);

router.delete(`${api.path}/areas/:id`, validate(['id'], validators), areaCtrl.deleteArea);

export default router;