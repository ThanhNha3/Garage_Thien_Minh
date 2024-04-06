const today = new Date();

const DatePickerReducer = (state = today, action) => {
  switch (action.type) {
    case "changeDatePicker": {
      return (state = action.date);
    }
    default: {
      return state;
    }
  }
  return state;
};
export default DatePickerReducer;
