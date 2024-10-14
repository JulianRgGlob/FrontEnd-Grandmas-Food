import axios from 'axios';

const ProductsApi = () => {
  const url = 'http://localhost:8080/api/delivery/v1/';
  const getProducts = async () => {
    try {
      const response = await axios.get(`${url}products`);
      console.log("api " + response.data);
      return response.data; 
    } catch (error) {
        console.error("Error fetching customer data:", error);
      return [];
    }
  };
  console.log("get" + {getProducts});
  
  return { getProducts };
};

export default ProductsApi