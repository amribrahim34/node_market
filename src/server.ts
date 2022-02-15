import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use('/api', routes);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ type: 'application/*+json' }));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

export default app;
