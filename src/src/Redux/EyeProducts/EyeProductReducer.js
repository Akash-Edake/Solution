import { Buy_Eye_Product } from "./EyeProductConstant";
import { add_Eye_Product } from "./EyeProductConstant";

const initialState = {
    noofeyeproduct:100
}
const EyeProductReducer=(state=initialState,action) => {
    switch(action.type){
        case Buy_Eye_Product:
            return{
                ...state,
                noofeyeproduct:state.noofeyeproduct-1
            }
        case add_Eye_Product:
            return{
                ...state,
                noofeyeproduct:state.noofeyeproduct+1
            }
        default:return state;
    }
}
export default EyeProductReducer
