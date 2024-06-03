import { useContext, useEffect, useState } from "react";
import { Box } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import { changeTimePicker } from "../redux/slices/timeSlotPickerSlide";

const TimeCard = (data) => {
  const { id, time, isActive } = data;
  const { dispatch, handleTimeActive } = useContext(dataContext);

  const [isAvailable, setIsAvailabel] = useState(false);
  useEffect(() => {
    if (handleTimeActive(time)) {
      setIsAvailabel(true);
    }
  });

  useEffect(() => {}, [isActive]);
  return (
    <Box
      onClick={() => {
        if (isAvailable) {
          dispatch(changeTimePicker({ id, time }));
        }
      }}
      p={2}
      className={`${isActive ? "cardTimerPickerActive" : ""} ${
        isAvailable ? "" : "cardTimerPickerDisable"
      }`}
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
