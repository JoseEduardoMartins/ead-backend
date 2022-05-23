import errorHandler from 'errorhandler';
import app from '../index';

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

const server = app.listen(app.get('port') || 3000, () => {
    console.log(
        'App running at \x1b[36mhttp://localhost:%d\x1b[0m in \x1b[33m%s\x1b[0m mode',
        app.get('port'),
        app.get('env')
    );
});

export default server;