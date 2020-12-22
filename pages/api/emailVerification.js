import graphQLClientAdmin from '../../graphql/client'
import {CONFIRM_USER_EMAIL} from '../../graphql/mutations'
export default async (req, res) => {

	// saves user to the database
	const execute = async (variables) => {
        const data = await graphQLClientAdmin.request( CONFIRM_USER_EMAIL, variables)
        // return: data to return have to be JSON FORMAT !!
        return data;
	};


  	if (req.method === 'GET') {
		try {
			// Get user data from body
            const id = req.query.id
            
            const userId = {id:id}

            const data = await execute(userId)
            // if query executes correctly redirects to homepage 
            if(data.update_user_by_pk.verificated){
                res.redirect(301,'/login') //?verificated=true
            }
		}
		catch (err) {
			res.status(500).json({ message: err})
		}

	} else {	// Any method that is not POST
		res.status(401).send("Method unauthorized");
	}
}