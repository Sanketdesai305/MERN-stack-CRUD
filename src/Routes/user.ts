import express,{Request, Response} from 'express';
const router = express.Router();
import cors from 'cors';
import bodyParser from 'body-parser';
import User from '../models/User';
router.use(bodyParser.json());
router.use(cors())

//CREATE USER ROUTE
router.post('/Add',async (req: Request,res: Response)=>{
    const newUser = new User({
        name: req.body.name,
        age:req.body.age,

    });

    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});
//UPDATE USER ROUTE
router.put("/Update/:id",async(req: Request,res: Response)=>{
    try{
        const updatesUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true});
        res.status(200).json(updatesUser)
    }catch(err){
        res.status(500).json(err)
    }

});
//DELETE USER ROUTE
router.delete("/Delete/:id", async (req: Request,res: Response)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
});

//GET ALL USER ROUTE
router.get("/Read", async (req: Request,res: Response)=>{
    try{
        const Alluser = await User.find();
        res.status(200).json(Alluser)
    }catch(err){
        res.status(500).json(err)
    }
});

export default router;