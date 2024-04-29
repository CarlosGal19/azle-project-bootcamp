import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

export default Server(() => {

    type Pet = {
        id: number,
        name: string,
        owner: string,
        email: string,
        phone: string
    };
    
    let pets: Pet[] = [
        {
            id: 1,
            name: 'Mickey',
            owner: 'Carlos',
            email: 'carlos@gmail.com',
            phone: '4405120993'
        }
    ];

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

    app.get('/pets', (req, res) => {
        res.send(pets);
    });

    app.post('/pet', (req, res) => {
        const { id, name, owner, email, phone } = req.body;
        console.log(req.body);
        if (!id || !name || !owner || !email || !phone) {
            res.status(403);
            return res.send({msg: 'All values are required'})
        }
        const newPet: Pet = {
            id,
            name,
            owner,
            email,
            phone
        };
        pets = [...pets, newPet];
        res.status(200);
        return res.send('Pet Added')
    })

    return app.listen();
});
