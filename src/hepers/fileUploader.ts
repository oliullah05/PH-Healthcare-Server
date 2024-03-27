import multer from "multer"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(),"uploads"))
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //   cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });



// flsdmkfmsdlf




const uploadToClodinary = async(file:any)=>{
    
cloudinary.config({
    cloud_name: 'ddbkkucbm',
    api_key: '213212774316986',
    api_secret: '9_Q4a16YUsDjML3zoZwB5ACQBmA'
  });
  
  cloudinary.uploader.upload("D:\\Level-2\\FullStackPath\\Module-25-healthcare-server\\uploads\\logo.jpg",
    { public_id: "olympic_flag" },
    function (error, result) { console.log({ error, result }, 55); });
}






export const fileUploader = {
    upload,
    uploadToClodinary
}