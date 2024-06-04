import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "zmp-ui";
import TimeCard from "../cards/timePickerCard";
import { dataContext } from "../providerContext/providerContext";
import { changeTimePicker } from "../redux/slices/timeSlotPickerSlice";
import { fetchAllTimeSlots } from "../redux/slices/timeSlotSlice";

const TimeSlot = () => {
  // Set state cho timeslot được chọn

  // Lấy hàm từ dataContext
  const { dispatch, handleTimeActive } = useContext(dataContext);
  const [defaultTimeslot, setDefaultTimeslot] = useState();

  // dispatch fired
  useEffect(() => {
    dispatch(fetchAllTimeSlots());
  }, []);

  // Lấy dữ liệu từ store
  const timeSlots = useSelector((state) => state.timeSlots.timeSlots);
  const timeSlotPicker = useSelector(
    (state) => state.timeSlotPicker.timeSlotPicker
  );

  // Set default timeslot trong trường hợp người dùng không chọn
  useEffect(() => {
    setDefaultTimeslot(() => {
      return timeSlots.find((timeslot) => handleTimeActive(timeslot.time));
    });
  }, [timeSlots]);

  useEffect(() => {
    if (defaultTimeslot !== undefined) {
      dispatch(changeTimePicker(defaultTimeslot));
    }
  }, [defaultTimeslot]);

  return (
    <Box>
      {timeSlots && timeSlots.length > 0 ? (
        <Box className="grid-cols-4 gap-4" style={{ display: "grid" }}>
          {timeSlots.map((time) => {
            return (
              <TimeCard
                key={time.id}
                id={time.id}
                time={time.time}
                isActive={time.id === timeSlotPicker.id}
              ></TimeCard>
            );
          })}
        </Box>
      ) : (
        <Box flex justifyContent="center" className="sub-title"></Box>
      )}
    </Box>
  );
};
export default TimeSlot;
