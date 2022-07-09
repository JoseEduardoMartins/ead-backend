import { router } from '../routes';
import controller from '../../domain/company/video/video.controller';
import { api } from '../config';

import validators from '../../domain/company/video/video.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/videos`, controller.getVideos);

router.get(`${api.path}/videos/:id`, validate(['id'], validators), controller.getVideo);

router.post(`${api.path}/videos`, validate(['activity_id', 'name', 'url'], validators), controller.createVideo);

router.put(`${api.path}/videos/:id`, validate([], validators), controller.updateVideo);

router.delete(`${api.path}/videos/:id`, validate(['id'], validators), controller.deleteVideo);

export default router;
