import  nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async(email:string,html:string)=>{
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.emailSender.nodemailer_email,
      pass: config.emailSender.nodemailer_app_password,
    },
    tls: {rejectUnauthorized: false},
  });
  
 
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"PH Health Care 👻" <mdolihasan@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "RESET PASSWORD LINK", // Subject line
    //   text: "Hello world?", // plain text body
      html, // html body
    });
    
    console.log("Message sent: %s", info.messageId);

}

export default emailSender;