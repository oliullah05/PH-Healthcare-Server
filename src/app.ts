import express, { Application, Response } from "express";
import cors from "cors"
const app: Application = express();

// middlewars
app.use(cors())


app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "PH health care server is running"
    })
})

export default app;