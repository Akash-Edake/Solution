import { Buy_Glass_Product } from "./GlassProductConst";
import { add_Glass_Product } from "./GlassProductConst";

const initialState = {
    noofglassproduct:100
}
const GlassProductReducer=(state=initialState,action) => {
    switch(action.type){
        case Buy_Glass_Product:
            return{
                ...state,
                noofglassproduct:state.noofglassproduct-1
            }
        case add_Glass_Product:
            return{
                ...state,
                noofglassproduct:state.noofglassproduct+1
            }
        default:return state;
    }
}
export default GlassProductReducer
