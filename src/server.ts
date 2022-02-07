import express from 'express';
import routes from './routes';

const app = express();
app.use('/api', routes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

export default app;
