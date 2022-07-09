import { router } from '../routes';
import controller from '../../domain/company/quiz/quiz.controller';
import { api } from '../config';

import validators from '../../domain/company/quiz/quiz.validations';
import { validate } from '../../domain/application/http-validator/http-validator';

router.get(`${api.path}/questionnaires`, controller.getQuestionnaires);

router.get(`${api.path}/questionnaires/:id`, validate(['id'], validators), controller.getQuiz);

router.post(`${api.path}/questionnaires`, validate(['activity_id', 'description', 'amountQuestion'], validators), controller.createQuiz);

router.put(`${api.path}/questionnaires/:id`, validate([], validators), controller.updateQuiz);

router.delete(`${api.path}/questionnaires/:id`, validate(['id'], validators), controller.deleteQuiz);

export default router;