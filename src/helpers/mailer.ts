import nodemailer from 'nodemailer'

interface incomingData {
    email: string;
    emailtype:string;
    userid:string
}

export const sendemail = async({ email, emailtype, userid }:incomingData) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailoptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email,
            subject: emailtype === 'VERIFY' ? 'verify your email' : 'reset your password',
            html: "<b>Hello world?</b>", // html body
        }

        const mailresponse = await transporter.sendMail(mailoptions);
        return mailresponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}



