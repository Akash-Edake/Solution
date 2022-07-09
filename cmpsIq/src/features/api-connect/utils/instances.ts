import axios from "axios"
const ApiInstance = axios.create({
    baseURL: 'https://compsiq-dv-ncus-app02.azurewebsites.net/',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});
export {ApiInstance}