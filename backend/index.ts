import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use((req, res, next) => {
        if (ic.caller().isAnonymous()) {
            res.status(401);
            res.send();
        } else {
            next();
        }
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    return app.listen();
});
