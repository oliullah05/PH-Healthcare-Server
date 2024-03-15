import { Server } from "https";
import app from "./app"
const port = 3000;
async function main() {
    const server:Server = app.listen(port,()=>{
        console.log(`PH Healthcare is running on port ${port}`);
    })
}

main()
