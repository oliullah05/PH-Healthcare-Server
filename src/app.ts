import express, { Application, Request, Response } from "express";
import cors from "cors"
import { userRoutes } from "./app/modules/User/user.routes";
import { adminRoutes } from "./app/modules/Admin/admin.routes";

const app: Application = express();

// middlewars
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "PH health care server is running"
    })
})

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/admin",adminRoutes)




app.get("*",(req: Request, res: Response) => {
    res.send({
        message: "Not found"
    })
})



export default app;