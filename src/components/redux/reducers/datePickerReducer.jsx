const today = new Date();

const DatePickerReducer = (state = today, action) => {
  switch (action) {
    case "changeDatePicker": {
      return (state = action.date);
    }
    default: {
      return state;
    }
  }
};
export default DatePickerReducer;
