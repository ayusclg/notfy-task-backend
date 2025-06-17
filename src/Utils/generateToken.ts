// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()


// interface jwtsign {
//     auth0Id: string,
//     email: string,
   
// }
// const secret = process.env.TOKEN_SECRET as string
// const expiresIn =  process.env.TOKEN_EXPIRY as string
// console.log("secret",secret)

// if(!secret ||!expiresIn)
// {
//     throw new Error("secret and options are invalid")
// }
// const generateToken = function (payload:jwtsign):string{
//     try {
//         const token = jwt.sign(payload, secret,{expiresIn}) 
        
//         return token
//     } catch (error) {
//         console.log("Token not generated")
//         throw new Error("Token Generation Failed")
//     }
// }

// export {generateToken}  