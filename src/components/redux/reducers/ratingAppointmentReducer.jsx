const ratings = [
  {
    id: 1,
    rating_value: "Dịch vụ rất tốt",
    rating_status: 1,
    appointment_id: 1,
  },
  {
    id: 2,
    rating_value: "Dịch vụ rất tệ",
    rating_status: 1,
    appointment_id: 2,
  },
  {
    id: 3,
    rating_value: "Dịch vụ cũng bình thường",
    rating_status: 1,
    appointment_id: 3,
  },
];

const RatingAppointmentReducer = (state = ratings, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default RatingAppointmentReducer;
