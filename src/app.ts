import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import { userRoutes } from "./app/modules/User/user.routes";
import { adminRoutes } from "./app/modules/Admin/admin.routes";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewars/globalErrorHandler";

const app: Application = express();

// middlewars
app.use(cors())


// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "PH health care server is running"
    })
})

app.use("/api/v1", router)

app.use(globalErrorHandler)



// app.get("*", (req: Request, res: Response) => {
//     res.send({
//         message: "Api Not Found"
//     })
// })


app.use((req:Request,res:Response,next:NextFunction)=>{
    console.log(req);
    res.status(404).json({
        success:false,
        message: "Api Not Found",
        error:{
            path:req.originalUrl,
            message:"Your requested path is not found"
        }
    })
})


export default app;