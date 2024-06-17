import axios from "axios";



export interface FetchResponse<T> {
    count: number;
    results: T[];
  }

export default axios.create({
    baseURL : 'http://127.0.0.1:8000/'
})