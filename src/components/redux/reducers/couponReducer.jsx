 const coupons = [
  {
    id: 1,
    product_id: 1,
    range: "Cửa hàng",
    name: "Có hiệu lực tại cửa hàng",
    description: "a",
    value: 0.5,
    status: 1,
    start_date: "1/1/2024",
    end_date: "2/2/2024",
    create_at: "1/2/2024",
    update_at: "1/2/2024",
    orders: 1,
  },
  {
    id: 2,
    product_id: 1,
    range: "Cửa hàng",
    name: "Có hiệu lực tại cửa hàng",
    description: "a",
    value: 0.5,
    status: 1,
    start_date: "1/1/2024",
    end_date: "2/2/2024",
    create_at: "1/2/2024",
    update_at: "1/2/2024",
    orders: 1,
  },
  {
    id: 3,
    product_id: 1,
    range: "Cửa hàng",
    name: "Có hiệu lực tại cửa hàng",
    description: "a",
    value: 0.5,
    status: 0,
    start_date: "1/1/2024",
    end_date: "2/2/2024",
    create_at: "1/2/2024",
    update_at: "1/2/2024",
    orders: 1,
  },
]

const CouponReducer = (state = coupons, action) => {
  if (action) {
    switch (action.type) {
    }
  }
  return state;
};

export default CouponReducer;