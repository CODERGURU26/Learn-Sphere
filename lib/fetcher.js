import axios from "axios"

const fetcher = async (url)=>{
    try{
        const {data} = await axios.get(url)
        return data
    }
    catch(err){
        throw new Error(err.message)
    }
}

export default fetcher