import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/RomanChasovitin/demo-api/users'
})

export const fetchUsersFromApi = () => instance.get('users');