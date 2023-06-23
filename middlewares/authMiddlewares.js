import User from "../models/user.js"
import encrypt from "encryptjs";

export const checks=async(req,res,next)=>{
    try{
        const{name,email,password,confirmpassword,pin,role}=req.body;
        if(!name) return res.send("Name is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!confirmpassword) return res.send("Confirm password is required.");
        if(!pin) return res.send("Pin is required.");
        if(!role) return res.send("Role is required.");

        if(password<=5 &&  confirmpassword <=5) return res.send("Password  and confrim password should be equal to more than 5 digits.");
        if(password !=confirmpassword) return res.send("password and confirm password must be equal");

        next();

    }catch(error){
        return res.send(error);
    }
}


export const checkGetUser=async(req,res,next)=>{
    try{
        const{email}=req.body;
        if(!email) return res.send("email is required.");

        const response=await User.find({email}).exec();
        if(!response.length) return res.send("User not found");

        if(response[0].role=="buyer"){
            next();
        }else{
            return res.send("Only buyer can get the products")
        }
    }catch(error){
        return res.send(error);
    }
}

export const addProductCheck=async(req,res,next)=>{
    try{
        const{email,pin}=req.body;
        if(!email) return res.send("email is required.");
        if(!pin) return res.send("pin is required.");

        const response=await User.find({email}).exec();
        if(!response.length) return res.send("User not found");

       const secretpin="pin";
       const decipherpin=encrypt.decrypt(response[0].pin,secretpin,256);

       if(decipherpin==pin){
        if(response[0].role=="seller"){
            next();
        }else{
            return res.send("Only seller can add the products");
        }
       }else{
        return res.send("Incorrect pin");
       }
    }catch(error){
        return res.send(error);
    }
}

export const updateCheck=async(req,res,next)=>{
    try{
        const{email,pin}=req.body;
        if(!email) return res.send("email is required.");
        if(!pin) return res.send("pin is required.");

        const response=await User.find({email}).exec();
        if(!response.length) return res.send("User not found");

       const secretpin="pin";
       const decipherpin=encrypt.decrypt(response[0].pin,secretpin,256);

       if(decipherpin==pin){
        if(response[0].role!="buyer"){
            next();
        }else{
            return res.send("Buyer is not allowed to update a data");
        }
       }else{
        return res.send("Incorrect pin");
       }
    }catch(error){
        return res.send(error);
    }
}

export const deletCheck=async(req,res,next)=>{
    try{
        const{email,pin}=req.body;
        if(!email) return res.send("email is required.");
        if(!pin) return res.send("pin is required.");

        const response=await User.find({email}).exec();
        if(!response.length) return res.send("User not found");

       const secretpin="pin";
       const decipherpin=encrypt.decrypt(response[0].pin,secretpin,256);

       if(decipherpin==pin){
        if(response[0].role=="admin"){
            next();
        }else{
            return res.send("Only admin can delete the data");
        }
       }else{
        return res.send("Incorrect pin");
       }
    }catch(error){
        return res.send(error);
    }
}