import mongoose, { Schema , models , model } from "mongoose";

const videoSchema = new Schema({
    course :{
        type : mongoose.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    title : {
        type : String , 
        required : true
    },
    size : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    path : {
        type : String,
        required : true
    }
}, {timestamps : true})

const VideoModel = models.Video || model("Video", videoSchema);

export default VideoModel