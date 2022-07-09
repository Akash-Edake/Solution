import {get} from "@features/api-connect"
import { ApiConnectCallback } from "@features/api-connect"

  export const getMetaData=(setter:any)=>{
    
    const  ApiConnectCallback:ApiConnectCallback={
         url:"Metadatas/metadata/lease/searchlease",
         data:{},
     successsCallback:(response:any):void=>{
       
      response.markets.forEach(element => {
        element.key=element.name;
        element.value=element.id
      });
      response.subMarkets.forEach(element => {
        element.key=element.name;
        element.value=element.id
      });
      setter(response)},
     failureCallback:(response:any):void=>{}
     }
     get(ApiConnectCallback);

 }

