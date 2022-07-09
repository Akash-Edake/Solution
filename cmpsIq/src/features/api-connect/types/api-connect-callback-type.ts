export type ApiConnectCallback={
    url:String,
    data:any,
successsCallback:(response:any)=>void,
failureCallback:(response:any)=>void
}