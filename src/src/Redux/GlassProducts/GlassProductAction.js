import { Buy_Glass_Product } from "./GlassProductConst"
import { add_Glass_Product } from "./GlassProductConst"

export const BuyGlassProduct = () => {
    return{
        type: 'Buy_Glass_Product'
    }
}
export const addGlassProduct = () => {
    return{
        type: 'add_Glass_Product'
    }
}