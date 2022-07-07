import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEyeProduct,BuyEyeProduct } from '../Redux/EyeProducts/EyeProductAction'


const EyeProduct = () => {
    const noofproducts=useSelector(state=>state.noofeyeproduct);
    console.log(noofproducts)
    const dispatch = useDispatch();
  return (
    <>
   <h2>Total Eye Products - {noofproducts} </h2>
   <button onClick={()=>dispatch(BuyEyeProduct())}>Buy Eye Products</button>
   <button onClick={()=>dispatch(addEyeProduct())}>Add Eye Products</button>
   </>
  )
}

export default EyeProduct