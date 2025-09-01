import mongoose from "mongoose";
mongoose.connect(process.env.DB)
import path from 'path'
import { NextResponse as res } from "next/server";
import VideoModel from "../../../../../model/video.model";
import fs from 'fs'


export const GET = async(req , {params})=>{
    try{
        const courseId = params.courseId
        const video = await VideoModel.find({course : courseId})
        return res.json(video)
        
    }
    catch(err){
        return res.json({message : err.message} , {status : 500}) 
    }
}

export const DELETE = async (req , {params})=>{
    try{
        const id = params.courseId
        const video = await VideoModel.findByIdAndDelete(id)
        const root = process.cwd()
       const videoPath =  path.join(root , "public" , video.path)
       fs.unlinkSync(videoPath)
       return res.json({message : "Video Lesson Deleted Successfully!"})
    }
    catch(err)
    {
        return res.json({message : err.message} , {status : 500})
    }
}
