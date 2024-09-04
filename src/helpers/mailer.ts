import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
interface incomingData {
  email: string;
  emailtype: string;
  userid: string;
}

export const sendemail = async ({ email, emailtype, userid }: incomingData) => {
  try {
    const hashedToken = await bcrypt.hash(userid.toString(), 20);

    if(emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userid, {
        verifytoken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if(emailtype === 'RESET') {
        await User.findByIdAndUpdate(userid,{
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000
        })
    }

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1cdd7c453c9d0e",
          pass: "8ceb790f1ac2d5"
        }
      });

    const mailoptions = {
      from: "kuamrchaurasiatanmay@gmail.com", // sender address
      to: email,
      subject:
        emailtype === "VERIFY" ? "verify your email" : "reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailtype === 'VERIFY' ? "Verify Your email" : "reset your password"}
      or copy and paste teh link below in the browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`, // html body
    };

    const mailresponse = await transport.sendMail(mailoptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
