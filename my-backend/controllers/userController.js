const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
module.exports.signup = async (req , res , next) =>{
    console.log(req.body);
    try{
        const {username , email , password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.json({msg :"Username already exists" , status: false});
        }
        
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({msg :"Email already exists" , status: false});
        }
        
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await User.create({
            username,
            email,
            password ,
            passwordHash : hashedPassword,
        })
    
        delete user.password
        return res.json({status: true , user});
    }
    catch (ex) {
        next(ex);
    }
}


module.exports.login = async (req , res , next) =>{
    console.log(req.body);
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json({msg :"User doesn't exists" , status: false});
        }
        
        // const isPassword = await bcrypt.compare(password , user.password);
        if(password != user.password){
            return res.json({msg :"Incorrect Password" , status: false});
        }
        
        delete user.password;
        return res.json({status: true , user});
    }
    catch (ex) {
        next(ex);
    }
}

module.exports.setAvatar = async (req , res , next)=>{
    try{
        const userId = req.params.id;
        const image = req.body.image;
        const userData = await User.updateOne({_id: userId}, {
            $set : {
                isAvatarImage: true,
                avatarImage :image,
            }
        });

        return res.json({
            isSet: true,
            image: image,
        });
    } catch(ex){
        next(ex);
    }
}

module.exports.getAllUsers = async (req , res , next) =>{
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            '_id',
            'email',
            'username',
            'avatarImage',
        ]);

        return res.json(users);
    } catch(ex){
        next(ex);
    }
}