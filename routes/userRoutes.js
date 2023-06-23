import express from "express";
import { addProductCheck, checkGetUser, checks, deletCheck, updateCheck } from "../middlewares/authMiddlewares.js";
import { CreateUser, addProduct, deletProduct, getProduct, updateUser } from "../controllers/userControllers.js";

const router=express.Router();

router.post('/CreateUser',checks,CreateUser);
router.post('/getProduct',checkGetUser,getProduct);
router.post('/addProduct',addProductCheck,addProduct);
router.put('/updateUser',updateCheck,updateUser);
router.delete('/deletProduct',deletCheck,deletProduct);

export default router;