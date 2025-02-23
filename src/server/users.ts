"use server";
import axios from "axios";

interface Users {
    id: string,
    email: string,
    name: string
}

export const get = async (): Promise<Users[]> => {
    const response = await axios.get(`${process.env.API_URL}/user`)
    return response.data;

//return await data.json();
    //return users.data;
};