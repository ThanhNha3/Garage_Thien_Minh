export const addProductSelected = (id, name, price, image) => {
  return {
    type: "add",
    data: {
      id,
      name,
      price,
      image,
    },
  };
};

export const removeProductSelected = (id, name, price, image) => {
  return {
    type: "remove",
    data: {
      id,
      name,
      price,
      image,
    },
  };
};
