import express , {Express , Response , Request , NextFunction} from 'express';

const app : Express = express();

const port : number = 3000;

app.use(express.json()); 

interface CustomRequest extends Request {
  startTime ?:  number;
}

app.use((req : CustomRequest , res : Response , next : NextFunction) => {
  req.startTime = Date.now();
  next();
})

app.get('/', (req : CustomRequest, res : Response) : void => {
  res.send('Hello World!');
});

interface user {
  id: number;
  name : string;
  email : string;
}

app.post('/' , (req : Request<{} , {} , user> , res : Response) : void => {
  const { name , email } = req.body;
  res.json({message: 'User created successfully', data : { name , email } });
});

app.get('/user/:id' , (req : Request<{ id : string} , {} , user>, res : Response) : void  => {
  const { id } = req.params;
  res.json({ message: 'User fetched successfully', data : { id } });
})

app.listen(port , () : void => {
  console.log(`Server is running at http://localhost:${port}`);
}) ;