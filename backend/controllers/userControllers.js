import User from "../models/userSchema.js"

const cookieOption = {
    httpOnly : true,
    secure : true,
    maxAge : 7*24*60*60*1000,
    sameSite : 'none'
}

export const register = async(req,res)=>{
    try{
        const {name,email,password,bio} = req.body
        if(!name || !email || !password || !bio){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        const existedUser = await User.findOne({email})
        if(existedUser){
            return res.status(400).json({
                success : false,
                message : "User already registered"
            })
        }
        const user = new User({
            name,email,password,bio
        })
        await user.save()
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Failed to registered,please try again"
            })
        }
        return res.status(200).json({
            success : true,
            message : "User registered successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User is not registered"
            })
        }
        const check = await user.comparePassword(password)
        if(!check){
            return res.status(400).json({
                success : false,
                message : "Incorrect password"
            })
        }
        const userToken = user.createJwt()
        const currentUser = await User.findById(user._id).select("-password")
        res.cookie('userToken',userToken,cookieOption)
        return res.status(200).json({
            success : true,
            data : currentUser,
            message : 'User logged in successfully'
        })
    }
    catch(err){
        console.log("Error : ",err.message)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access: No user logged in"
            });
        }

        res.clearCookie('userToken', cookieOption);
        
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const getProfile = async(req,res)=>{
    try{
        const user = req.user
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User is not login"
            })
        }
        const userProfile = await User.findById(user?._id).select("-password")
        if(!userProfile){
            return res.status(400).json({
                success : false,
                message : "Unable gto fetch the profile"
            })
        }
        return res.status(200).json({
            success : true,
            data : userProfile,
            message : "User profile fetched succefully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}