import React, { useState, useEffect, useContext } from "react";
import { Box, Text } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import {
  addProductSelected,
  removeProductSelected,
} from "../redux/actions/productsSelectedAction";

import Store from "../redux/store";

const ProductCard = ({ id, name, price, image }) => {
  const [buttonActive, setButtonActive] = useState(false);
  const { formatCurrency } = useContext(dataContext);

  useEffect(() => {
    Store.getState().productsSelected.find(
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
              ? Store.dispatch(removeProductSelected(id, name, price, image))
              : Store.dispatch(addProductSelected(id, name, price, image));
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
