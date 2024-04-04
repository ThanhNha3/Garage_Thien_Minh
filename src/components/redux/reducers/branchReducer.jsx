const branches = [
  {
    id: 1,
    name: "Garage Thiện Minh 1",
    address: "Cao đẳng FPT Polytechnic Cần Thơ",
    image:
      "https://thanhphongauto.com/wp-content/uploads/2020/03/can-bang-dong-banh-xe.jpg", //giữ nguyên cho tất cả các item khác
    phone_number: "097788999",
    status: 1,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    city_id: 1,
  },
  {
    id: 2,
    name: "Garage Thiện Minh 2",
    address: "Cao đẳng FPT Polytechnic Cần Thơ",
    image:
      "https://thanhphongauto.com/wp-content/uploads/2020/03/can-bang-dong-banh-xe.jpg", //giữ nguyên cho tất cả các item khác
    phone_number: "097788999",
    status: 1,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    city_id: 1,
  },
  {
    id: 3,
    name: "Garage Thiện Minh 3",
    address: "Sóc Trăng",
    image:
      "https://thanhphongauto.com/wp-content/uploads/2020/03/can-bang-dong-banh-xe.jpg", //giữ nguyên cho tất cả các item khác
    phone_number: "097788999",
    status: 1,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    city_id: 2,
  },
  {
    id: 4,
    name: "Garage Thiện Minh 4",
    address: "Sóc Trăng",
    image:
      "https://thanhphongauto.com/wp-content/uploads/2020/03/can-bang-dong-banh-xe.jpg", //giữ nguyên cho tất cả các item khác
    phone_number: "097788999",
    status: 1,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    city_id: 2,
  },
  {
    id: 5,
    name: "Garage Thiện Minh 5",
    address: "Sóc Trăng",
    image:
      "https://thanhphongauto.com/wp-content/uploads/2020/03/can-bang-dong-banh-xe.jpg", //giữ nguyên cho tất cả các item khác
    phone_number: "097788999",
    status: 1,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    city_id: 2,
  },
  {
    id: 6,
    name: "Garage Thiện Minh 6",
    address: "Hà Nội",
    image:
      "https://thanhphongauto.com/wp-content/uploads/2020/03/can-bang-dong-banh-xe.jpg", //giữ nguyên cho tất cả các item khác
    phone_number: "097788999",
    status: 1,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    city_id: 3,
  },
];

const BranchReducer = (state = branches, action) => {
  if (action) {
    switch (action.type) {
    }
  }
  return state;
};

export default BranchReducer;
