
import dotenv from 'dotenv'
dotenv.config();
import app from './app.js';




import connectDB from "./db/index.js";






connectDB()
.then((res)=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Listening on http://localhost${process.env.PORT || 8000}`);
    })
    // app.on((error)=>{
    //     console.log("Error starting the app ",error);
    //     process.exit(1);
    // })
})
.catch((err)=>{
    console.log('Connection failed in ./src/index.js');
}
)


