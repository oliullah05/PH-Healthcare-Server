import { Server } from "https";
import app from "./app"
import config from "./config";
const port = 3000;

async function main() {
   
    const server:Server = app.listen(config.port,()=>{
        console.log(`PH Healthcare is running on port ${config.port}`);
    })
}

main()
