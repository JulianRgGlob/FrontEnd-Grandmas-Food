// import axios from 'axios';

// const ProductsApi = () => {
//   const url = 'http://localhost:8080/api/delivery/v1/';
//   const getProducts = async () => {
//     try {
//       const response = await axios.get(`${url}products`);
//       console.log("api " + response.data);
//       return response.data;
//     } catch (error) {
//         console.error("Error fetching customer data:", error);
//       return [];
//     }
//   };
//   console.log("get" + {getProducts});

//   return { getProducts };
// };

// export default ProductsApi

const ProductsApi = () => {
  const mockProducts = [
    {
      id: 2,
      productUuid: "550e8400-e29b-41d4-a716-446655440001",
      category: "CHICKEN,FISH",
      fantasyName: "GRILLED_CHICKEN",
      description: "Grilled chicken breast with a side of vegetables.",
      price: 7.99,
      is_available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      productUuid: "550e8400-e29b-41d4-a716-446655440002",
      category: "MEATS",
      fantasyName: "STEAK_DINNER",
      description: "Juicy steak with mashed potatoes and gravy.",
      price: 15.99,
      is_available: false,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      productUuid: "550e8400-e29b-41d4-a716-446655440003",
      category: "DESSERTS",
      fantasyName: "CHOCOLATE_CAKE",
      description: "Rich chocolate cake with a layer of fudge.",
      price: 4.99,
      is_available: true,
      created_at: "2023-10-01T00:00:00Z",
    },
    {
      id: 5,
      productUuid: "550e8400-e29b-41d4-a716-446655440004",
      category: "VEGAN_FOOD",
      fantasyName: "VEGAN_SALAD",
      description: "A healthy salad with mixed greens, nuts, and vinaigrette.",
      price: 6.99,
      is_available: true,
      created_at: "2023-10-01T00:00:00Z",
    },
    {
      id: 6,
      productUuid: "550e8400-e29b-41d4-a716-446655440005",
      category: "KIDS_MEALS",
      fantasyName: "HAPPY_MEAL",
      description: "Cheeseburger with fries for kids.",
      price: 4.49,
      is_available: true,
      created_at: "2023-10-01T00:00:00Z",
    },
  ];
  const getProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 1000);
    });
  };
  return { getProducts };
};

export default ProductsApi
