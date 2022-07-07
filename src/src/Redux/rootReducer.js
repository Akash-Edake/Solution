import { combineReducers } from "redux";
import GlassProductReducer from "./GlassProducts/GlassProductReducer";
import EyeProductReducer from "./EyeProducts/EyeProductReducer";

const rootReducer = combineReducers({
glassProduct:GlassProductReducer,
eyeProduct:EyeProductReducer
})

export default rootReducer;