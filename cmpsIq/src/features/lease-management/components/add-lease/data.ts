import {get} from "@features/api-connect"
import { ApiConnectCallback } from "@features/api-connect"

  export const getMetaData=(setter:any,sourceType?:string)=>{
   
    const  ApiConnectCallback:ApiConnectCallback={
         url:"Metadatas/metadata/lease/createlease",
         data:{},
     successsCallback:(response:any):void=>{
      
      response.leaseGenerations.forEach(element => {
        element.key=element.name;
        element.value=element.id
      });
      response.leaseStructures.forEach(element => {
        element.key=element.name;
        element.value=element.id
      });
      response.leaseTypes.forEach(element => {
        element.key=element.name;
        element.value=sourceType=="compstack"?element.name:element.id
      });
      response.tenantTypes.forEach(element => {
        element.key=element.name;
        element.value=element.id
      });
      setter(response)},
     failureCallback:(response:any):void=>{}
     }
     get(ApiConnectCallback);

 }

 export const getLeaseDetails=(setter:any,id:string)=>{
 
  const  ApiConnectCallback:ApiConnectCallback={
       url:`lease/${id}`,
       data:{},
   successsCallback:(response:any):void=>{
    
     setter(response)
   },
  
   failureCallback:(response:any):void=>{}
   }
   get(ApiConnectCallback);

}
export const getCompstackLeaseDetails=(setter:any,id:string)=>{
 
  const  ApiConnectCallback:ApiConnectCallback={
       url:`CompStakLease/${id}`,
       data:{},
   successsCallback:(response:any):void=>{
    
     setter(response)
   },
  
   failureCallback:(response:any):void=>{}
   }
   get(ApiConnectCallback);

}

export const getPropertyDetails=(setter:any,id:number)=>{
 
  const  ApiConnectCallback:ApiConnectCallback={
       url:`property/${id}`,
       data:{},
   successsCallback:(response:any):void=>{
    
     setter(response)
   },
  
   failureCallback:(response:any):void=>{}
   }
   get(ApiConnectCallback);
}