// let products = [
//   {
//     id: 1,
//     name: "Service 1",
//     price: 300000,
//     image:
//       "https://thanhphongauto.com/wp-content/uploads/2020/03/can-bang-dong-banh-xe.jpg",
//     description: "a",
//     category_id: 4,
//     status: 1,
//     orders: 1,
//     create_at: "1/1/2024",
//     update_at: "2/2/2024",
//   },
// ];

let products = [];

const ProductReducer = async (state = products, action) => {
  if (action) {
    switch (action.type) {
      case "getting_product_request": {
        console.log("đang lấy");
        break;
      }
      case "getting_product_success": {
        console.log("đã lấy");
        break;
      }
      case "getting_product_fail": {
        console.log("sai");
        break;
      }
      default: {
        return state;
      }
    }
  }
  return state;
};

export default ProductReducer;
