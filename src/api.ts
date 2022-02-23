import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
const productURL: string = "http://localhost:3001/product/";
const userUrl: string = "http://localhost:3001/user/";
const loginUrl: string = "http://localhost:3001/login";

export const api = {
  getProducts: async () => {
    let response = await axios.get(productURL);
    return response.data;
  },
  getProductId: async (id: any) => {
    let response = await axios.get(`${productURL}${id}`);
    return response.data;
  },

  addProduct: async (
    name: string,
    brand: string,
    price: number,
    color: string,
    src?: any,
    createDate?: any
  ) => {
    let response = await axios.post(productURL, {
      name,
      brand,
      price,
      color,
      src,
      createDate,
    });
    return response.data;
  },
  removeProduct: async (id: any) => {
    await axios.delete(`${productURL}${id}`);
  },

  editProduct: async (
    id: any,
    name: string,
    brand: string,
    price: number,
    color: string,
    src?: any,
    createDate?: any
  ) => {
    let response = await axios.put(`${productURL}${id}`, {
      name,
      brand,
      price,
      color,
      src,
      createDate,
    });
    return response.data;
  },
  getUser: async () => {
    let response = await axios.get(userUrl);
    return response.data;
  },
  getUserId: async (id: any) => {
    let response = await axios.get(`${userUrl}${id}`);
    return response.data;
  },

  addUser: async (name: string, email: string, password: string) => {
    let response = await axios.post(userUrl, {
      name,
      email,
      password,
    });
    return response.data;
  },
  removeUser: async (id: any) => {
    await axios.delete(`${userUrl}${id}`);
  },

  editUser: async (id: any, name: string, email: string, password: string) => {
    let response = await axios.put(`${userUrl}${id}`, {
      name,
      email,
      password,
    });
    return response.data;
  },
  login: async (email: string, password: string) => {
    let response = await axios.post(`${loginUrl}`, {
      email,
      password,
    });
    return response;
  },
};
