const { transporter } = require("../config/emailTransporter");
require("dotenv").config();


// Create and Save a new Tasker
async function EmailSend(request){
        try{
        transporter.sendMail({
          to: request.email,
          subject: "noreply@atyourservice - Confirm Email",
          html: `<h1>Hello ${request.c_firstName} ${request.c_lastName}</h1>
          <h2>Your request has been recorded.</h2> 
          <h2>We will check the availability of tasker as erly as possible.<br> thank you</h2>`,
        });
        console.log("Mail send successful");
      }catch(error)
      {
        console.log(error);
      }
};

module.exports = { EmailSend };