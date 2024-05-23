const today = new Date().toISOString();

const DatePickerReducer = (state = today, action) => {
  switch (action.type) {
    case "changeDatePicker": {
      return action.date; 
    }
    default: {
      return state;
    }
  }
};
export default DatePickerReducer;