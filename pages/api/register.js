import fetch from "node-fetch";
import {CREATE_USER_REGISTRATION} from '../../graphql/mutations';

export default async (req, res) => {
  /*
  GraphQL mutation which inserts a user in TABLE USER
  ------
  have to implement the crypt_password() function !

  */
  
    //async function that executes the GraphQL mutation
    //the function needs VARIABLES -> username, email, password (NOT IN ORDER)
    //returns the server response

      const execute = async (variables) => {
        const fetchResponse = await fetch(
          "https://climbing-bear-85.hasura.app/v1/graphql",
          {
            method: 'POST',
            body: JSON.stringify({
              query: CREATE_USER_REGISTRATION,
              variables
            })
          }
        );
        const data = await fetchResponse.json();
        return data;
  
      };

      //BLOCK OD CODE THAT FIND OUT THE TYPE OF THE REQUEST
      // TAKES ONLY POST REQUESTS
  if (req.method === 'POST') {

    // GETS THE USED PARAMETERS
    const { username, email, password } = req.body;

    // CALL TO EXECUTION OF THE QUERY
    const { data, errors } = await execute({ username, email, password });

    if (errors) {
      res.status(400).json(errors[0])
    }
    //RETURNS TO CLIENT THE FIELDS OF THE QUERY
    res.status(201).json({
      ...data.insert_user_one
    })
  } else {
    //IF THE METHON IS NOT POST
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
