const data = {};
const CustomerInformationReducer = (state = data, action) => {
  switch (action.type) {
    case "updateCustomerInformation": {
      return (state = action.data);
    }
    default: {
      return state;
    }
  }
};

export default CustomerInformationReducer;
