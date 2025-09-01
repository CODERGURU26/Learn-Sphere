import mongoose from "mongoose";
mongoose.connect(process.env.DB)
import { NextResponse as res } from "next/server";
import VideoModel from "../../../../model/video.model";
import CourseModel from "../../../../model/course.model";


export const GET = async (req)=>{
    try{
        const totalCourse = await CourseModel.countDocuments()
        const totalVideos = await VideoModel.countDocuments()

      const [{memoryUsed , totalVideosHour}] = await  VideoModel.aggregate([
            {
                $group:{
                    _id : null,
                    memoryUsed : {$sum : '$size'},
                    totalVideosHour : {$sum : '$duration'}
                }
            }
        ])

        return res.json(
            {
                totalCourse , 
                totalVideos , 
                memoryUsed : (memoryUsed/1000/1000).toFixed(2) , 
                totalVideosHour : (totalVideosHour/60/60).toFixed(2) })
    }
    catch(err){
        return res.json({message : err.message} , {status : 500})
    }
}
