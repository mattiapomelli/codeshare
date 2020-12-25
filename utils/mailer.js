import nodemailer from 'nodemailer';

//initialization and settings of nodemailer module
let transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: 465,
	// secure: false, // upgrade later with STARTTLS
	auth: {
	  user: process.env.GMAIL_EMAIL,
	  pass: process.env.GMAIL_PASSWORD
	}
});


export default async function sendMail(to, subject, html) {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: 'hello@codeshare.tech',
            to: to,
            subject,
            html
        },(err,info) => {
            if (err){
                reject("Something went wrong")
            }
            resolve()
        })
    })
}