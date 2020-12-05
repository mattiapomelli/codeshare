import { gql } from 'graphql-request'

export default async (req, res) => {

	// saves user to the database
	const execute = async (variables) => {
		const query = gql`
        mutation ($id: uuid!) {
            update_user_by_pk(pk_columns: {id: $id}, _set: {verificated: true}){
              verificated
            }
          }
                    
        `
        const data = await graphQLClientAdmin( query, variables)
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
                res.redirect(301,'/') //?verificated=true
            }
		}
		catch (err) {
			res.status(500).json({ message: err})
		}

	} else {	// Any method that is not POST
		res.status(401).send("Method unauthorized");
	}
}