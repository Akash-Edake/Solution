import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BuyGlassProduct } from '../Redux/GlassProducts/GlassProductAction'


const GlassProduct = () => {
    const noofproducts=useSelector(state=>state.noofglassproduct);
    const dispatch = useDispatch();
  return (
    <>
   <h2>Total Glass Products - {noofproducts} </h2>
   <button onClick={()=>dispatch(BuyGlassProduct())}>Buy Glass Products</button>
   </>
  )
}

export default GlassProduct