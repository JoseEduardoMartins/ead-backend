import { router } from '../routes';
import sectorCtrl from '../../domain/company/sector/sector.controller';
import { api } from '../config';

import validators from '../../domain/company/sector/sector.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/sectors`, sectorCtrl.getSectors);

router.get(`${api.path}/sectors/:id`, validate(['id'], validators), sectorCtrl.getSector);

router.post(`${api.path}/sectors`, validate(['name', 'description'], validators), sectorCtrl.createSector);

router.put(`${api.path}/sectors/:id`, validate(['id', 'name', 'description'], validators), sectorCtrl.updateSector);

router.delete(`${api.path}/sectors/:id`, validate(['id'], validators), sectorCtrl.deleteSector);

export default router;