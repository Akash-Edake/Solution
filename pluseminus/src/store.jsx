import {configureStore} from '@reduxjs/toolkit'
import combine from "./reducer/Combine"

const store =configureStore({
    reducer:{
        root:combine
    }
});

export default store