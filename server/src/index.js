const express = require('express');
const cors = require('cors');

const { configDataBase } = require('./config/configDataBase');
const { configExpress } = require('./config/configExpress');
const { configRouters } = require('./config/routes');

const PORT = 3000;

async function start() {
    const app = express();
    
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    }));

    app.use(express.json());


    await configDataBase();
    configExpress(app);
    configRouters(app);

    app.listen(PORT, () => {
        console.log(`Server started http://localhost:${PORT}`);
    });
};

start();