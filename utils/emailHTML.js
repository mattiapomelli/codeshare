
export const emailVerification = (username,userId) =>{
  var html = `
  Hello ${username}<br />
  Welcome to CodeShare!
  To verify your email please click the button below <br />
  <a href=${process.env.NEXTAUTH_URL}/api/emailVerification?id=${userId}><button>Verify</button></a>
  `;
  return html
}


export const retrieveMail = (email, userId) =>{
  var html = `
  Click this link to receive a new password <br />
  <a href=${process.env.NEXTAUTH_URL}/api/retrievepassword?id=${userId}&email=${email}><button>Reset password</button></a>
  `;
  return html
}

export const newPasswordEmail = (password) =>{
  var html = `
  Your new password is: ${password} <br />
  <a href=${process.env.NEXTAUTH_URL}/login><button>Reset password</button></a>
  `;
  return html
}