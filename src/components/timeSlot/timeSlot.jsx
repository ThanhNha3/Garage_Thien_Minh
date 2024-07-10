import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "zmp-ui";
import TimeCard from "../cards/timePickerCard";
import { dataContext } from "../providerContext/providerContext";
import { changeTimePicker } from "../redux/slices/timeSlotPickerSlice";
import { fetchAllTimeSlots } from "../redux/slices/timeSlotSlice";

const TimeSlot = () => {
  const dispatch = useDispatch();
  const { handleTimeActive } = useContext(dataContext);
  const [defaultTimeslot, setDefaultTimeslot] = useState();

  // Fetch time slots and set default time slot
  useEffect(() => {
    dispatch(fetchAllTimeSlots());
  }, [dispatch]);

  const timeSlots = useSelector((state) => state.timeSlots.timeSlots);
  const timeSlotPicker = useSelector((state) => state.timeSlotPicker.timeSlotPicker);

  // Set default time slot when time slots change
  useEffect(() => {
    if (timeSlots && timeSlots.length > 0) {
      const defaultSlot = timeSlots.find((slot) => handleTimeActive(slot.start_time));
      if (defaultSlot) {
        setDefaultTimeslot(defaultSlot);
      }
    }
  }, [timeSlots, handleTimeActive]);

  // Change time picker when default time slot changes
  useEffect(() => {
    if (defaultTimeslot) {
      dispatch(changeTimePicker(defaultTimeslot));
    }
  }, [defaultTimeslot, dispatch]);

  return (
    <Box>
      {timeSlots && timeSlots.length > 0 ? (
        <Box className="grid-cols-4 gap-4" style={{ display: "grid" }}>
          {timeSlots.map((time) => (
            <TimeCard
              key={time.id}
              id={time.id}
              time={time.start_time}
              isActive={time.id === timeSlotPicker.id}
            />
          ))}
        </Box>
      ) : (
        <Box flex justifyContent="center" className="sub-title" />
      )}
    </Box>
  );
};

export default TimeSlot;
