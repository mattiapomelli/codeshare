function validateRegisterInput(data) {

    const { username, email, password } = data

    if(!email) return new Error("Email is required")
    if(!username) return new Error("Username is required")
    if(!password) return new Error("Password is required")

    if(username.length < 4 || username.length > 10) return new Error("Username must be between 4 and 10 characters long")
    if(password.length < 6) return new Error("Password must be at least 6 characters long")

    return null;
};

export default validateRegisterInput
