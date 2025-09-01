import mongoose from "mongoose";
mongoose.connect(process.env.DB)
import { NextResponse as res } from "next/server";
import fs from 'fs'
import path from "path";
import VideoModel from "../../../../model/video.model";

export const POST =async (req)=>{
    try{
        const formData = await req.formData()
        const video = formData.get("video") 
        const bytes = await video.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const root = process.cwd()
        const fileName = `${Date.now()}.mp4`
        const filePath = path.join(root , "public" , "videos" , fileName)
        fs.writeFileSync(filePath , buffer)

        const payload = {
            title : formData.get("title"),
            size : formData.get("size"),
            duration : formData.get("duration"),
            course : formData.get("courseId"),
            path : `/videos/${fileName}`
        }

        const videoData = await VideoModel.create(payload)
        return res.json(videoData)
    }
    catch(err){
        return res.json({message : err.message} , {status : 500})
    }
}