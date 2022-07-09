const rooturl = 'https://web-lnk-compsappapi-ncus-dv-01.azurewebsites.net/api/v1/';
export const getGeneric=(setter:any,endpoint:string)=>{
    const headers = {'Content-Type': 'application/json'};
  

    fetch(`${rooturl}${endpoint}`, {headers})
      .then((response) => response.json())
      .then((data) => {
       // console.log(data);
        setter((endpoint==='Markets' || endpoint==='SubMarkets')? (data?.data?.results ?? []) : data?.data?.results?.map((x:any)=>{return{key:x.name,value:x.code}}));
      });
  
  }
  