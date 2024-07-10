import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import { changeTimePicker } from "../redux/slices/timeSlotPickerSlice";

const TimeCard = (data) => {
  let { id, time, isActive } = data;
  const { dispatch, handleTimeActive } = useContext(dataContext);
  const datePicker = useSelector((state) => state.datePicker.datePicker);

  const [isAvailable, setIsAvailabel] = useState(false);
  useEffect(() => {
    if (handleTimeActive(time)) {
      setIsAvailabel(true);
    }
  });

  // Cắt bớt phần giây
  const index = time.lastIndexOf(":");
  time = time.slice(0, index);

  const handleAvailableDate = useCallback(() => {
    const arrayDatePicker = datePicker.split("/");
    const currentDate = new Date().getDate();
    if (Number(arrayDatePicker[0]) > currentDate) {
      setIsAvailabel(true);
    } else {
      setIsAvailabel(false);
    }
  });

  useEffect(() => {
    handleAvailableDate();
  }, [datePicker]);

  useEffect(() => {}, [isActive]);
  return (
    <Box
      onClick={() => {
        if (isAvailable) {
          dispatch(changeTimePicker({ id, start_time: time }));
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
