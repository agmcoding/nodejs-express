const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const usersMap = new Map();
usersMap.set(randomUUID(), { username: 'Bob', email: 'bob@example.com' });
usersMap.set(randomUUID(), { username: 'Amy', email: 'amy@example.com' });
usersMap.set(randomUUID(), { username: 'Duke', email: 'duke@example.com' });

app.get('/welcome/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/api/users/', (request, response) => {
  response.status(200).send(Array.from(usersMap));
});

app.get('/api/users/:ID', (request, response) => {
  const { ID } = request.params;

  if (usersMap.has(ID) === false) {
    response.status(404).send(`User not found with ID: ${ID}`);
    return;
  }

  const user = usersMap.get(ID);
  response.status(200).send(user);
});

app.post('/api/users/', (request, response) => {
  const { username, email } = request.body;

  if (username === undefined) {
    response.status(400).send('Missing username');
    return;
  }

  if (email === undefined) {
    response.status(400).send('Missing email');
    return;
  }

  const ID = randomUUID();
  usersMap.set(ID, { username, email });

  const createdUser = usersMap.get(ID);
  const result = [ID, createdUser];

  response.status(201).send(result);
});

app.put('/api/users/:ID', (request, response) => {
  const { ID } = request.params;
  const { username, email } = request.body;

  if (username === undefined) {
    response.status(400).send('Missing username');
    return;
  }

  if (email === undefined) {
    response.status(400).send('Missing email');
    return;
  }

  if (usersMap.has(ID) === false) {
    response.status(404).send(`User not found with ID: ${ID}`);
    return;
  }

  usersMap.set(ID, { username, email });
  response.status(204).end();
});

app.delete('/api/users/:ID', (request, response) => {
  const { ID } = request.params;

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
