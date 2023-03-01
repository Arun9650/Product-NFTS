import Product from "../../modals/product";
import db from "../../utils/db";



const handler = async (req, res) => {


    await db.connect()
    const product  = await Product.findById(req.query.id);
    console.log(product)
    await db.disconnect()
    res.send(product)

}

export default  handler;