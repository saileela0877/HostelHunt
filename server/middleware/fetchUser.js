var jwt = require('jsonwebtoken')
const JWT_SECRET = "GaneshCBIT$@"
const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({error:"please use a vaild token"})
    }
    try {
        const string = jwt.verify(token,JWT_SECRET);
        req.user = string.user;
        // req.user = string;

        next()
    } catch (err) {
      return res.status(401).json("please use a valid token second")
    }

}

module.exports = fetchUser;