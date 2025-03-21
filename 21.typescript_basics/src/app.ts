import express , {Express} from 'express';

const app : Express = express();

const port : number = 3000;

app.use(express.json()); 

app.get('/', (req : express.Request, res : express.Response) : void => {
  res.send('Hello World!');
});

app.listen(port , () : void => {
  console.log(`Server is running at http://localhost:${port}`);
}) ;