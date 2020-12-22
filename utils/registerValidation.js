const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

function validateRegisterInput(data) {

    const { username, email, password } = data

    if(!email) return new Error("Email is required")
    if(!username) return new Error("Username is required")
    if(!password) return new Error("Password is required")

    if(!email.match(emailRegex)) return new Error("Email must be a valid email")
    if(username.length < 4 || username.length > 20) return new Error("Username must be between 4 and 20 characters long")
    if(password.length < 8) return new Error("Password must be at least 8 characters long")
    if(!password.match(passwordRegex)) return new Error("Password must have at least one uppercases letter, one lowercase letter and one number")

    return null;
};

export default validateRegisterInput
