const users = [
  {
    id: 1,
    zalo_id: 123213,
    name: "Mặc định",
    phone: "094663912",
    email: "nha@123.com",
    role: 1,
    status: 1,
    orders: 1,
    image:
      "https://th.bing.com/th/id/OIP.Qvf9UmzJS1V5YafT9NQZlAHaKL?rs=1&pid=ImgDetMain",
    create_at: "1/1/2024",
    update_at: "2/2/2024",
  },
  {
    id: 2,
    zalo_id: 123213,
    name: "Thanh Vũ",
    phone: "094663912",
    email: "nha@123.com",
    role: 1,
    status: 1,
    orders: 1,
    image:
      "https://th.bing.com/th/id/OIP.Qvf9UmzJS1V5YafT9NQZlAHaKL?rs=1&pid=ImgDetMain",
    create_at: "1/1/2024",
    update_at: "2/2/2024",
  },
  {
    id: 3,
    zalo_id: 123213,
    name: "Văn Tính",
    phone: "094663912",
    email: "nha@123.com",
    role: 1,
    status: 1,
    orders: 1,
    image:
      "https://th.bing.com/th/id/OIP.Qvf9UmzJS1V5YafT9NQZlAHaKL?rs=1&pid=ImgDetMain",
    create_at: "1/1/2024",
    update_at: "2/2/2024",
  },
  {
    id: 4,
    zalo_id: 123213,
    name: "Thanh Nhả",
    phone: "094663912",
    email: "nha@123.com",
    role: 1,
    status: 1,
    orders: 1,
    image:
      "https://th.bing.com/th/id/OIP.Qvf9UmzJS1V5YafT9NQZlAHaKL?rs=1&pid=ImgDetMain",
    create_at: "1/1/2024",
    update_at: "2/2/2024",
  },
];

const UserReducer = (state = users, action) => {
  if (action) {
    switch (action.type) {
    }
  }
  return state;
};

export default UserReducer;
