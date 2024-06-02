import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "zmp-ui";
import TimeCard from "../cards/timePickerCard";
import { dataContext } from "../providerContext/providerContext";
import { fetchAllTimeSlots } from "../redux/slices/timeSlotSlide";

const TimeSlot = () => {
  // Set state cho timeslot được chọn

  // Lấy hàm từ dataContext
  const { dispatch } = useContext(dataContext);

  // dispatch fired
  useEffect(() => {
    dispatch(fetchAllTimeSlots());
  }, []);

  // Lấy dữ liệu từ store
  const timeSlots = useSelector((state) => state.timeSlots.timeSlots);
  const timeSlotPicker = useSelector(
    (state) => state.timeSlotPicker.timeSlotPicker
  );

  return (
    <Box className="grid-cols-4 gap-4" style={{ display: "grid" }}>
      {timeSlots &&
        timeSlots.length > 0 &&
        timeSlots.map((time) => {
          return (
            <TimeCard
              key={time.id}
              id={time.id}
              time={time.time}
              isActive={time.id === timeSlotPicker}
            ></TimeCard>
          );
        })}
    </Box>
  );
};
export default TimeSlot;
