import bcrypt from 'bcrypt'
import { request, gql } from 'graphql-request'

// TODO: error handling
export default async (req, res) => {
	const endpoint = "https://climbing-bear-85.hasura.app/v1/graphql"

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
		return JSON.stringify(data);
	};


  	if (req.method === 'POST') {
		try {
			// Get user data from body
			const { username, email, password } = req.body

			const hashedPassword = await bcrypt.hash(password, 10)

			const user = {username, email, password: hashedPassword}

			const data = await execute(user)

			res.status(201).json({ message: "Check your email to verify your account"})
		}
		catch (err) {
			res.status(500).json({ message: err})
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
