const TimePickerReducer = (state = 1, action) => {
  switch (action.type) {
    case "changeTimePicker": {
      return (state = action.timePickerId);
    }
    default: {
      return state;
    }
  }
};

export default TimePickerReducer;
