import bcrypt from 'bcrypt'
import { CREATE_USER_MUTATION } from '../../graphql/mutations'
import graphQLClientAdmin from '../../graphql/client'
import nodemailer from 'nodemailer';
import {emailVerification, verificationEmail} from '../../utils/emailHTML';


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


// TODO: error handling
export default async (req, res) => {

	// saves user to the database
	const execute = async (variables) => {
		//console.log(variables)
		const data = await graphQLClientAdmin.request( CREATE_USER_MUTATION, variables)
		// return: data to return have to be JSON FORMAT !!
		return data.user;
	};


  	if (req.method === 'POST') {
		try {
			// Get user data from body
			const { username, email, password } = req.body
			
			const hashedPassword = await bcrypt.hash(password, 10)

			const user = {username, email, password: hashedPassword}

			const userData = await execute(user)

			// after query return send email verification link,
			//if error in query the @try@catch block will catch the error
			//all sensitive data are located in process.env file
			transporter.sendMail({
				from: 'hello@codeshare.tech',
				to: user.email,
				subject: 'Email verification',
				//html code to display on user screen
				html: emailVerification(username,userData.id);
			},(err,info)=>{
				if (err){
					return res.status(500).send({message: "Something went wrong"})
				}
				return res.status(201).send({ message: "Check your email to verify your account"})
			})
		}
		catch (err) {
			console.log(err)
			res.status(500).send({ message: "Something went wrong"})
		}

	} else {	// Any method that is not POST
		res.status(401).send("Method unauthorized");
	}
}



/*
{
snippet(limit: 6, offset: 0) {
  title
  likes {
    snippet {
      likes {
        snippetId
      }
    }
  }
}
}
*/
