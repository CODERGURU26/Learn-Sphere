
const getPrice = (price , discount)=>{
    const amount = (price*discount)/100
    return price - amount
}

export default getPrice