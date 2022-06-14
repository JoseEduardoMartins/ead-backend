import { Router } from 'express';

const router = Router();
require('./routes/user.route');
require('./routes/sector.route');
require('./routes/technology.route');

export { router };