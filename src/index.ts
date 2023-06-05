import express, { Request, Response } from "express";
import { router } from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Fake Store rest API for your e-commerce or shopping website prototype"
  );
});

app.use("/api/v1", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
