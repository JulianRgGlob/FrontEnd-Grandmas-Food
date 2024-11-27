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
      fantasyName: "ORANGE_JUICE",
      description: "Delicius juice with savour orange.",
      price: 4.49,
      is_available: true,
      created_at: "2023-10-01T00:00:00Z",
    },{
      id: 7,
      productUuid: "550e8400-e29b-41d4-a716-446655440006",
      category: "PASTA",
      fantasyName: "SPAGHETTI",
      description: "Classic spaghetti with a rich bolognese sauce.",
      price: 8.99,
      is_available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 8,
      productUuid: "550e8400-e29b-41d4-a716-446655440007",
      category: "SOUPS",
      fantasyName: "TOMATO_SOUP",
      description: "Creamy tomato soup served with a slice of garlic bread.",
      price: 5.49,
      is_available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 9,
      productUuid: "550e8400-e29b-41d4-a716-446655440008",
      category: "BEVERAGES",
      fantasyName: "ORANGE_JUICE",
      description: "Freshly squeezed orange juice.",
      price: 3.99,
      is_available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 10,
      productUuid: "550e8400-e29b-41d4-a716-446655440009",
      category: "SEAFOOD",
      fantasyName: "GRILLED_SALMON",
      description: "Grilled salmon fillet served with lemon butter sauce.",
      price: 13.99,
      is_available: false,
      created_at: new Date().toISOString(),
    },
    {
      id: 11,
      productUuid: "550e8400-e29b-41d4-a716-446655440010",
      category: "DESSERTS",
      fantasyName: "CHEESECAKE",
      description: "Classic New York-style cheesecake with a strawberry topping.",
      price: 5.99,
      is_available: true,
      created_at: "2023-10-01T00:00:00Z",
    },
    {
      id: 12,
      productUuid: "550e8400-e29b-41d4-a716-446655440011",
      category: "APPETIZERS",
      fantasyName: "MOZZARELLA",
      description: "Crispy mozzarella sticks served with marinara sauce.",
      price: 6.49,
      is_available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 13,
      productUuid: "550e8400-e29b-41d4-a716-446655440012",
      category: "VEGAN_FOOD",
      fantasyName: "VEGAN_BURGER",
      description: "Plant-based burger with lettuce, tomato, and vegan mayo.",
      price: 9.99,
      is_available: true,
      created_at: "2023-10-01T00:00:00Z",
    },
    {
      id: 14,
      productUuid: "550e8400-e29b-41d4-a716-446655440013",
      category: "BREAKFAST",
      fantasyName: "PANCAKE",
      description: "Stack of fluffy pancakes with syrup and butter.",
      price: 7.49,
      is_available: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 15,
      productUuid: "550e8400-e29b-41d4-a716-446655440014",
      category: "KIDS_MEALS",
      fantasyName: "MAC_N_CHEESE",
      description: "Creamy mac and cheese for kids.",
      price: 4.29,
      is_available: true,
      created_at: "2023-10-01T00:00:00Z",
    },
    {
      id: 16,
      productUuid: "550e8400-e29b-41d4-a716-446655440015",
      category: "MEATS",
      fantasyName: "BBQ_RIBS",
      description: "Tender BBQ ribs served with coleslaw and fries.",
      price: 17.99,
      is_available: false,
      created_at: new Date().toISOString(),
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
