import { Router } from 'express';

const router = Router();
require('./routes/user.route');
require('./routes/course.route');
require('./routes/area.route');
require('./routes/topic.route');
require('./routes/theme.route');

export { router };