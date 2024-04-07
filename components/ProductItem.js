import React from 'react'
import { Button, Card, CardFooter, CardHeader } from '@material-tailwind/react';
import Image from 'next/image'
import Link from 'next/link';
export default function ProductItem(props) {

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    const { product } = props;
    const { addtocartHandler } = props;
    return (

        <Card className=" overflow-hidden m-3 border rounded-2xl   ">
            <Link href={`/product/${product._id}`}>
                <div className="h-64 w-auto flex overflow-hidden">

                    <Image
                        src={product.img}
                        alt={product.title}
                        width={300}
                        height={300}
                        quality={100}

                        className="object-contain  cursor-pointer"
                    />
                </div>
            </Link>
            <CardFooter divider className='mx-4 p-5 flex justify-between'>
                <div className=''>
                 <div className='font-Roboto text-[#0e0a23] truncate w-28'>{product.title}</div>
                    <div className='font-light '> {dollarUS.format(product.price)}</div>
                </div>
                <div className=''>
                    <Button onClick={() => addtocartHandler(product)} size='sm' className='p-3 active:scale-95 bg-[#21248A]'>Add to  Cart</Button>
                </div>
            </CardFooter>
        </Card>





    )
}
