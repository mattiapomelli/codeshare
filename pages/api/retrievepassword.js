import { gql } from 'graphql-request'
import {MODIFY_USER_PASSWORD} from '../../graphql/mutations'
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


  	if (req.method === 'POST') {
		try {
            const {email} = req.body;
            //check if email exists


            //
            //create new password
            const newPassword = makeNewPassword(10);
            //modify password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            //create variable object
            const variables={
                email: email,
                password:hashedPassword
            }

            //call mutation query
            const data = await graphQLClientAdmin.request(MODIFY_USER_PASSWORD,variables);

            return ;

            
		}
		catch (err) {
			res.status(500).json({ message: err})
		}

	} else {	// Any method that is not POST
		res.status(401).send("Method unauthorized");
	}
}