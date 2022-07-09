import {createStore} from 'redux';
import GlassProductReducer from './GlassProducts/GlassProductReducer';

const store=createStore(GlassProductReducer)
export default store
