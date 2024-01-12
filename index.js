const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const usersMap = new Map();
usersMap.set('bobid', { "username": "Bob", "email": "bob@example.com" });
usersMap.set('amyid', { "username": "Amy", "email": "amy@example.com" });
usersMap.set('dukeid', { "username": "Duke", "email": "duke@example.com" });

app.get('/welcome/', (request, response) => {
    response.status(200).send('Welcome!');
});

app.get('/api/users/', (request, response) => {
    response.status(200).send(Array.from(usersMap));
});

app.get('/api/users/:ID', (request, response) => {
    const ID = request.params.ID;

    if (usersMap.has(ID) === false) {
        response.status(404).send(`User not found with ID: ${ID}`);
        return;
    }

    const user = usersMap.get(ID);
    response.status(200).send(user);
});

app.put('/api/users/:ID', (request, response) => {
    const ID = request.params.ID;
    const { username, email } = request.body;

     if (username === undefined) {
        response.status(400).send('Missing username');
        return;
    } else if (email === undefined) {
        response.status(400).send('Missing email');
        return;
    }

    if (usersMap.has(ID) === false) {
        response.status(404).send(`User not found with ID: ${ID}`);
        return;
    }

    usersMap.set(ID, request.body);
    response.status(204).end();
});

app.delete('/api/users/:ID', (request, response) => {
    const ID = request.params.ID;

    const userDeleted = usersMap.delete(ID);

    if (userDeleted === false) {
        response.status(404).send(`User not found with ID: ${ID}`);
        return;
    }

    response.status(204).end(); 
});

app.listen(port, () => {
    console.log('Server starting...');
    console.log(`Listening on port ${port}`);
});