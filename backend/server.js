import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('welcome from home');
});

app.listen(8000, () => {
  console.log('server is listening...');
});
