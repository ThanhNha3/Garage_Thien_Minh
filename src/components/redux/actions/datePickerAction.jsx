export const ChangeDatePicker = (date) => {
  return {
    type: "changeDatePicker",
    date: date.toISOString(), // Chuyển đổi thành chuỗi ISO 8601
  };
};
