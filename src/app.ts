import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);
console.log('🚀 Server started on port 3333!');

export default app;
