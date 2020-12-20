import {MODIFY_USER_PASSWORD} from '../../graphql/mutations'
import { GET_USER_BY_EMAIL_QUERY } from '../../graphql/queries'
import graphQLClientAdmin from '../../graphql/client'
import bcrypt from 'bcrypt'

function makeNewPassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

async function getUserByEmail(email) {
  const data = await graphQLClientAdmin.request( GET_USER_BY_EMAIL_QUERY, { email })
  return data.user
}

export default async (req, res) => {

  	if (req.method === 'POST') {
		try {
            const {email} = req.body;
            //check if email exists
            const emails = await getUserByEmail(email)
            if(emails.length == 0) throw new Error("No account associated to this email")

            //
            //create new password
            const newPassword = makeNewPassword(10);
            console.log(newPassword)
            //modify password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            //create variable object
            const variables={
                email: email,
                password:hashedPassword
            }

            //call mutation query
            const data = await graphQLClientAdmin.request(MODIFY_USER_PASSWORD,variables);

            return res.status(201).send({ message: "Check your email to complete password reset", type: 'success'})

            
		}
		catch (err) {
			res.status(err.status || 500).send({ message: err.message})
		}

	} else {	// Any method that is not POST
		res.status(401).send("Method unauthorized");
	}
}