import { useContext } from "react";
import { Box } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import { changeTimePicker } from "../redux/slices/timeSlotPickerSlide";

const TimeCard = (data) => {
  const { id, time, isActive } = data;
  const { dispatch } = useContext(dataContext);
  return (
    <Box
      onClick={() => {
        dispatch(changeTimePicker({ id, time }));
      }}
      p={2}
      className={isActive ? "cardTimerPickerActive" : ""}
      style={{
        border: "var(--text-disable) solid 1px",
        textAlign: "center",
        borderRadius: "5px",
      }}
    >
      {time}
    </Box>
  );
};

export default TimeCard;
