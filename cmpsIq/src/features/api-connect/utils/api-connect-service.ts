import { ApiConnectCallback } from "../types/api-connect-callback-type";
import { ApiInstance } from "./instances";
const get=(apiConnectCallback: ApiConnectCallback)=>{
    ApiInstance.get(`${apiConnectCallback.url}`)
    .then(reponse => {
        
        console.log("-----------------------Get Request Succeeded---------------------------")
        console.log("URL",`${ApiInstance.defaults.baseURL}${apiConnectCallback.url}`);
        console.log(reponse?.data)
        console.log("-----------------------XXXXXXXXXXXXXXXXXX---------------------------")
       
    apiConnectCallback.successsCallback( reponse?.data);
    })
    .catch(error => {
        console.log("-----------------------Get Request Failed---------------------------")
        console.log("URL",`${ApiInstance.defaults.baseURL}${apiConnectCallback.url}`);
        console.log(error)
        console.log("-----------------------XXXXXXXXXXXXXXXXXX---------------------------")
    apiConnectCallback.failureCallback(error);
    });

}

const post=(apiConnectCallback: ApiConnectCallback)=>{
    
    ApiInstance.post(`${apiConnectCallback.url}`,apiConnectCallback.data)
    .then(reponse => {
        
        console.log("-----------------------Post Request Succeeded---------------------------")
        console.log("URL",`${ApiInstance.defaults.baseURL}${apiConnectCallback.url}`);
        console.log(reponse?.data)
        console.log("-----------------------XXXXXXXXXXXXXXXXXX---------------------------")
       
    apiConnectCallback.successsCallback( reponse?.data);
    })
    .catch(error => {
        
        console.log("-----------------------Post Request Failed---------------------------")
        console.log("URL",`${ApiInstance.defaults.baseURL}${apiConnectCallback.url}`);
        console.log(error)
        console.log("-----------------------XXXXXXXXXXXXXXXXXX---------------------------")
    apiConnectCallback.failureCallback(error);
    });
};
const put=(apiConnectCallback: ApiConnectCallback)=>{
    
    ApiInstance.put(`${apiConnectCallback.url}`,apiConnectCallback.data)
    .then(reponse => {
        
        console.log("-----------------------Put Request Succeeded---------------------------")
        console.log("URL",`${ApiInstance.defaults.baseURL}${apiConnectCallback.url}`);
        console.log(reponse?.data)
        console.log("-----------------------XXXXXXXXXXXXXXXXXX---------------------------")
       
    apiConnectCallback.successsCallback( reponse?.data);
    })
    .catch(error => {
        
        console.log("-----------------------Put Request Failed---------------------------")
        console.log("URL",`${ApiInstance.defaults.baseURL}${apiConnectCallback.url}`);
        console.log(error)
        console.log("-----------------------XXXXXXXXXXXXXXXXXX---------------------------")
    apiConnectCallback.failureCallback(error);
    });
};
export {get,post,put} 