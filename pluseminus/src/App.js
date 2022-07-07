import {useSelector,useDispatch} from "react-redux"
import {pluse,minus} from "./action/action"

function App() {
  const ak =useSelector(state=>state.root.reducer)
  const dispatch = useDispatch()
  console.log(ak)
  return (
   <>
   <h2>{ak}</h2>
   <button onClick={()=>dispatch(pluse())}>pluse</button>
   <button onClick={()=>dispatch(minus())}>minus</button>
   </>
  );
}

export default App;
