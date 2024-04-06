const BranchChosenReducer = (state = 1, action) => {
  switch (action.type) {
    case "changeBranchChosen": {
      return (state = action.branch_id);
    }
    default: {
      return state;
    }
  }
};

export default BranchChosenReducer;
