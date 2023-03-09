import React, { useContext } from 'react'
import Layout from '../../components/Layout';
import Product from '../../modals/product';
import { AppWrapper } from '../../utils/context';
import db from '../../utils/db';
import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@material-tailwind/react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiArrowLeft } from 'react-icons/hi';
// import handler from './[tokenId]'
function ProductScreen(props) {
    const {product} = props;

    // console.log("product",product)

    const {state, dispatch} = useContext(AppWrapper)


    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const addtocartHandler = async () =>{
        const existItem = state.cart.cartItem.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const  {data}  = await axios.get(`/api/${product._id}`);
        
        // {console.log("data file : [_id{",data)}

        if (data.countInStock < quantity) {
          return toast.error('Sorry. Product is out of stock');
        }   

        dispatch({type:'CART_ADD_ITEM', payload:{...product, quantity}})
        
    }

    
  return (
   <Layout title={product.title} >
    <div className='grid md:grid-cols-2   gap-3 px-9'>
       <div className='mt-20 border-black'>
         <div className='border rounded flex  border-blue-gray-600 w-fit px-4'>
            <Link href="/" className="flex  items-center justify-center gap-3">
           <HiArrowLeft/>  back 
            </Link>
         </div>
       
         <Image src={product.img}
         alt={product.title}
         width={640} 
         height={540}
         className="  object-contain rounded  "
         quality={100}
        
         />
         
        
       </div>
        <div className=' font-light border-black pt-24 '>
           <div className='text-3xl  font-medium'> {product.title}</div>

            <div className=''>
                Description: {product.description ? product.description :" Not found"}
            </div>

            <div className='font-'>Price  :   <span className=''>{dollarUS.format(product.price)}</span> </div>
            <div>Rating : {product.rating ? product.rating : "Not Found"}</div>
            <div className=''>Review: {product.numReviews}</div>
            <div>Availability: {product.countInStock}</div>
            <Button className="font-Poppins bg-[#21248A] font-normal" onClick={addtocartHandler}>Add to cart</Button>
        </div>
    </div>

   </Layout>
  )
}

export default ProductScreen




// export async function getServerSideProps(context) {
//     const {params} = context;
//     const {_id} = params;
//     await db.connect();
//     console.log("params",params)

//     const product = await Product.findOne({_id}).lean();
//     await db.disconnect();

//     return {
//         props:{
//             product: product ? JSON.parse(JSON.stringify(product)) :null,
//         }
//     }
// }



export async function getServerSideProps(context) {
    const {params} = context;
    const {_id} = params;
    await db.connect();
    // console.log("params",params)
    
    const product = await Product.findOne({_id}).lean();
    // await db.disconnect();

    return {
        props:{
            product: product ? JSON.parse(JSON.stringify(product)) :null,
        }
    }
}


// export async function getStaticPaths() {
//     // Return a list of possible value for id
//     await db.connect();
//     const products = await Product.find({}).lean();
//     await db.disconnect();
//     return {
//         paths: products.map((product) => ({
//             params: { _id: product._id.toString() },
//         })),
//         fallback: false,
//     };
//   }

//   export async function getStaticProps({ params }) {
//     // Fetch necessary data for the blog post using params.id
//    const { _id } = params;
//     await db.connect();

//     const product = await Product.findOne({ _id }).lean();
//     await db.disconnect();

//     return {
//         props: {
//             product: product ? JSON.parse(JSON.stringify(product)) : null,
//         },
//     };

//   }