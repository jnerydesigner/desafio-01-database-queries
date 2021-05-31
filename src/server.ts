import express, { Request, Response } from "express";

import "express-async-errors";
import "./database";

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Hellow'
  })
})

app.listen(3333, () => console.log("Server is running 🏎️ "));