const defaultStaffIdChosen = 1;

const StaffChosenReducer = (state = defaultStaffIdChosen, action) => {
  switch (action.type) {
    case "change": {
      return (state = action.dataId);
    }
    default: {
      return state;
    }
  }
};

export default StaffChosenReducer;
