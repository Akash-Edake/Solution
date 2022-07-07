const adding =(state=0,action)=>{
    switch(action.type){
        case "ADD":return state+2
        case "REMOVE":return state-2
        default : return state
    }
}
export default adding