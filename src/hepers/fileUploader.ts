import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import path from "path";
import fs from "fs"
import { ICloudinaryResponse, IFile } from '../app/interface/file';

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
cloudinary.config({
    cloud_name: 'ddbkkucbm',
    api_key: '213212774316986',
    api_secret: '9_Q4a16YUsDjML3zoZwB5ACQBmA'
  });



const uploadToClodinary = async(file:IFile):Promise<ICloudinaryResponse |undefined>=>{
    console.log({file},88887777);
return new Promise((resolve,reject)=>{
  cloudinary.uploader.upload(
    // "D:\\Level-2\\FullStackPath\\Module-25-healthcare-server\\uploads\\logo.jpg",
file.path,
    // { public_id: file.originalname},
    (error:Error, result:ICloudinaryResponse) =>{
        fs.unlinkSync(file.path)
  if(error){
    reject(error)
  }
  else{
    resolve(result)
  }
    });
})
  

}






export const fileUploader = {
    upload,
    uploadToClodinary
}