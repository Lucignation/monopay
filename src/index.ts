import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './utils/swagger';

//import routes
import routes from './routes';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//cors
app.use(
  cors({
    origin: '*',
  })
);

//port
const port = process.env.PORT || 5000;

//connect database
connectDB();

app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => console.log(`Server running at ${port}`));
