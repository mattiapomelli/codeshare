
export const emailVerification = (username,userId) =>{
  var html = `
  Hello ${username}<br />
  Welcome to CodeShare!
  To verify your email please click the button below <br />
  <a href=${process.env.NEXTAUTH_URL}/api/emailVerification/?id=${userId}><button>Verify</button></a>
  `;
  return html
}