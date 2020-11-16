import bcrypt from 'bcrypt'
import { request, gql } from 'graphql-request'
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


// TODO: error handling
export default async (req, res) => {
	const endpoint = process.env.NEXT_PUBLIC_HASURA_URL

	// saves user to the database
	const execute = async (variables) => {
		const query = gql`
			mutation($username:String!, $email:String!,$password:String!){
				insert_user_one(object:{
					email:$email
					username:$username
					password:$password
				})
				{
					id
					createdAt
				}
			}
		`
		const data = await request(endpoint, query, variables)
		// return: data to return have to be JSON FORMAT !!
		return data;
	};


  	if (req.method === 'POST') {
		try {
			// Get user data from body
			const { username, email, password } = req.body

			const hashedPassword = await bcrypt.hash(password, 10)

			const user = {username, email, password: hashedPassword}

			const data = await execute(user)
			// after query return send email verification link,
			//if error in query the @try@catch block will catch the error
			//all sensitive data are located in process.env file
			transporter.sendMail({
				from: 'CodeShare',
				to: user.email,
				subject: 'Email verification',
				//html code to display on user screen
				html: `
				Hello ${username}<br />
				Welcome to CodeShare!
				To verify your email please click the button below <br />
				<a href=${process.env.NEXTAUTH_URL}/api/emailVerification/?id=${data.insert_user_one.id}><button>Verify</button></a>
				`
			},(err,info)=>{
				if (err){
					return res.status(500).send(err)
				}
				return res.status(201).send({ message: "Check your email to verify your account"})
			})
		}
		catch (err) {
			res.status(500).send({ message: err})
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
