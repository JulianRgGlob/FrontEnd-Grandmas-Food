import React, { useState, useEffect } from "react";

function CartItem(props) {
  const { productId, quantity } = props.data;
  const { products } = props;
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    console.log("prodcuts",products);
    
    if (Array.isArray(products)) {
      const findDetail = products.find(product => product.productUuid === productId);
      setDetail(findDetail);
    } else {
      console.error("products no es un array:", products); 
    }
  }, [productId, products]);
  return (
    <div>
      {detail ? (
        <>
          <h3>{detail.fantasyName}</h3>
          <p>Quantity: {quantity}</p>
          <p>Price: ${detail.price}</p>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default CartItem;
