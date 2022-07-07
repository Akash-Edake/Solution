import {useSelector,useDispatch} from "react-redux"
import {pluse,minus} from "./action/action"
import {add,remove} from "./action/action2"

function App() {
  const ak =useSelector(state=>state.root.reducer)
  const ak2 =useSelector(state=>state.root.reducer2)
  const dispatch = useDispatch()
  return (
   <>
   <h2>{ak}</h2>
   <button onClick={()=>dispatch(pluse())}>pluse</button>
   <button onClick={()=>dispatch(minus())}>minus</button>
   <br/>
   <h2>{ak2}</h2>
   <button onClick={()=>dispatch(add())}>ADD</button>
   <button onClick={()=>dispatch(remove())}>REMOVE</button>
   </>
  );
}

export default App;
