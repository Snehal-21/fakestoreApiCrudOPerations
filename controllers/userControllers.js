import axios from "axios";
import User from "../models/user.js"
import encrypt from "encryptjs";

export const CreateUser=async(req,res)=>{
    try{
        const{name,email,password,pin,role}=req.body;

        const response=await User.find({email}).exec();
        if(response.length) return res.send("Email alfeady taken");

        const secretpin="pin";
        const encryptpin=encrypt.encrypt(pin,secretpin,256);

        const secrepass="pass";
        const secretpass=encrypt.encrypt(password,secrepass,256);

        const user=new User({
            name,
            email,
            password:secretpass,
            pin:encryptpin,
            role
        });

        await user.save();
        return res.send("User registered successfully.")
    }catch(error){
        return res.send(error)
    }
}

export const getProduct=async(req,res)=>{
    try{
        const response =await axios.get('https://fakestoreapi.com/products');
        return res.send(response.data);
    }catch(error){
        return res.send(error)
    }
}


export const addProduct=async(req,res)=>{
    try{
        const { title, price, description, category, image } = req.body;
        const response=await axios.post('https://fakestoreapi.com/products',{
            title,
            price,
            description,
            category,
            image,
        });
        return res.send(response.data);
    }catch(error){
        return res.send(error);
    }
}

export const updateUser=async(req,res)=>{
    try{
        // const{id}=req.params;
        const {id,title, price, description, category, image } =req.body;
        const response = await axios.put(`https://fakestoreapi.com/products/${id}`, {
            title,
            price,
            description,
            category,
            image,
        });
       res.send(response.data);

    }catch(error){
        return res.send(error);
    }
}


export const deletProduct=async(req,res)=>{
    try{
        const{id}=req.body;
        await axios.delete(`https://fakestoreapi.com/products/${id}`);
            return res.send("Product deleted successfully.")
        
    }catch(error){
        return res.send(error);
    }
}
