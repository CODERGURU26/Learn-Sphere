import { message } from "antd";
import { NextResponse as res } from "next/server";
import mongoose from "mongoose";
import CourseModel from "../../../../model/course.model";
import path from "path";
import fs from 'fs'

mongoose.connect(process.env.DB)

export const POST = async (req)=>{
    try{
        const formData = await req.formData()
        const file =  formData.get("thumbnail")
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
       
        const root = process.cwd()
        const fileName  = `${Date.now()}.jpg`
        const filePath = path.join(root , "public" , "thumbnails", fileName)
        fs.writeFileSync(filePath, buffer)

        const payload = {
            title : formData.get('title'),
            description : formData.get('description'),
            price : formData.get('price'),
            discount : formData.get('discount'),
            thumbnail : `/thumbnails/${fileName}`
        }
        const course = await CourseModel.create(payload)
        return res.json(course)
    }
    catch(err){
        return res.json({message : err.message} , {status:500})
    }
}

export const GET =  async (req)=>{
    const courses = await CourseModel.find()
    return res.json(courses)
}