import { Router } from 'express';

const router = Router();
require('./routes/user.route');
require('./routes/area.route');
require('./routes/course.route');
require('./routes/topic.route');
require('./routes/theme.route');
require('./routes/activity.route');
require('./routes/video.route');
require('./routes/quiz.route');
require('./routes/question.route');
require('./routes/choice.route');
export { router };