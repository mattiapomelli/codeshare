const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validateRegisterInput(data) {

    const { username, email, password } = data

    if(!email) return new Error("Email is required")
    if(!username) return new Error("Username is required")
    if(!password) return new Error("Password is required")

    if(!email.match(emailRegex)) return new Error("Email must be a valid email")
    if(username.length < 4 || username.length > 10) return new Error("Username must be between 4 and 10 characters long")
    if(password.length < 6) return new Error("Password must be at least 6 characters long")

    return null;
};

export default validateRegisterInput
