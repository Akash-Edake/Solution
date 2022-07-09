import React from "react"
const ViewLease=(props:any)=>{
return(
    <><pre>{JSON.stringify(props.row.row.original, undefined, 2)}</pre></>
)
}

export default ViewLease;