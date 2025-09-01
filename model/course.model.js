import { Schema , model , models } from "mongoose";

const courseSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        default : 0
    },
    thumbnail : {
        type : String,
        required : true
    }
} , {timestamps : true})

const CourseModel = models.Course || model("Course" , courseSchema)
export default CourseModel