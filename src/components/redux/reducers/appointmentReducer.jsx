const appointments = [
  {
    id: 1,
    zalo_id: 1,
    branch_id: 1,
    employee_id: 1,
    appointment_date: "28/03/2024",
    note: "Vui lòng kiểm tra thêm lốp xe",
    status: 0,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    services_id: [1, 2, 3],
    time_picker_id: 6,
    note: "Hello 1",
  },
  {
    id: 2,
    customer_id: 2,
    branch_id: 2,
    employee_id: 2,
    appointment_date: "28/03/2024",
    note: "Vui lòng kiểm tra thêm lốp xe",
    status: 1,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    services_id: [1, 2, 3],
    time_picker_id: 5,
    note: "Hello 2",
  },
  {
    id: 3,
    customer_id: 2,
    branch_id: 2,
    employee_id: 2,
    appointment_date: "28/03/2024",
    note: "Vui lòng kiểm tra thêm lốp xe",
    status: 2,
    orders: 1,
    create_at: "1/1/2024",
    update_at: "2/2/2024",
    services_id: [1, 2, 3],
    time_picker_id: 5,
    note: "Hello 3",
  },
];

const AppointmentReducer = (state = appointments, action) => {
  if (action) {
    switch (action.type) {
    }
  }
  return state;
};

export default AppointmentReducer;
