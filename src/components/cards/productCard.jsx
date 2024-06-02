import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Box, Text } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import {
  selectProduct,
  removeProduct,
} from "../redux/slices/productSelectedSlide";
const ProductCard = ({ id, name, price, image }) => {
  // Set nút active
  const [buttonActive, setButtonActive] = useState(false);

  // Lấy dữ liệu từ dataContext
  const { formatCurrency, dispatch } = useContext(dataContext);

  //dispatch fired

  // Lấy dữ liệu từ store

  const productsSelected = useSelector(
    (state) => state.productsSelected.productsSelected
  );

  useEffect(() => {
    productsSelected.find(
      (productSelected) => productSelected.id === Number(id)
    )
      ? setButtonActive(true)
      : setButtonActive(false);
  }, []);

  return (
    <Box>
      <Box>
        <img src={image} alt={name} />
      </Box>
      <Box flex flexDirection="column" className="gap-2">
        <Box px={2} flex flexDirection="column" className="gap-2">
          <Text.Title>{name}</Text.Title>
          <Text>{formatCurrency(price)}</Text>
        </Box>
        <button
          style={{
            background: buttonActive ? "var(--secondary-color)" : "",
            color: buttonActive ? "var(--white-color)" : "",
          }}
          onClick={() => {
            setButtonActive(!buttonActive);
            buttonActive
              ? dispatch(removeProduct({ id, name, price, image }))
              : dispatch(selectProduct({ id, name, price, image }));
          }}
          className="w-full border py-2"
        >
          {buttonActive ? "Đã chọn" : "Chọn"}
        </button>
      </Box>
    </Box>
  );
};

export default ProductCard;
