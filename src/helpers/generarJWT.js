import jwt from 'jsonwebtoken';
const generarWT = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "20d"})
}

export default generarWT;