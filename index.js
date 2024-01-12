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

app.listen(port, () => {
    console.log('Server starting...');
    console.log(`Listening on port ${port}`);
});