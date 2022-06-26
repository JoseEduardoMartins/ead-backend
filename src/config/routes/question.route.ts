import { router } from '../routes';
import controller from '../../domain/company/question/question.controller';
import { api } from '../config';

import validators from '../../domain/company/question/question.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/questions`, controller.getQuestions);

router.get(`${api.path}/questions/:id`, validate(['id'], validators), controller.getQuestion);

router.post(`${api.path}/questions`, validate(['quiz', 'description', 'type'], validators), controller.createQuestion);

router.put(`${api.path}/questions/:id`, validate(['id', 'quiz', 'description', 'type'], validators), controller.updateQuestion);

router.delete(`${api.path}/questions/:id`, validate(['id'], validators), controller.deleteQuestion);

export default router;