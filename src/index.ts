import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './database';

function init() {
    app.listen(app.get('port'));
    console.log('Server on port', 4001);
};

init();
