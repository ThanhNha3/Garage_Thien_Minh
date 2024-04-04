import { useEffect, useState } from "react";
import { Box } from "zmp-ui";
import TimeCard from "../cards/timePickerCard";
import Store from "../redux/store";

const timers = [
  { id: 1, time: "8:00" },
  { id: 2, time: "8:30" },
  { id: 3, time: "9:00" },
  { id: 4, time: "9:30" },
  { id: 5, time: "10:00" },
  { id: 6, time: "10:30" },
  { id: 7, time: "11:00" },
  { id: 8, time: "11:30" },
  { id: 9, time: "12:00" },
  { id: 10, time: "12:30" },
  { id: 11, time: "13:00" },
  { id: 12, time: "13:30" },
  { id: 13, time: "14:00" },
  { id: 14, time: "14:30" },
  { id: 15, time: "15:00" },
  { id: 16, time: "15:30" },
  { id: 17, time: "16:00" },
  { id: 18, time: "16:30" },
  { id: 19, time: "17:00" },
  { id: 20, time: "17:30" },
  { id: 21, time: "18:00" },
];

const TimePicker = () => {
  const [currentTimePickerId, setCurrentTimePickerId] = useState();

  useEffect(() => {
    setCurrentTimePickerId(Store.getState().timePicker);
  }, []);

  useEffect(() => {
    Store.subscribe(() => {
      setCurrentTimePickerId(Store.getState().timePicker);
    });
  }, [Store.getState().timePicker]);
  return (
    <Box className="grid-cols-4 gap-4" style={{ display: "grid" }}>
      {timers.map((time) => {
        return (
          <TimeCard
            key={time.id}
            id={time.id}
            time={time.time}
            isActive={time.id === currentTimePickerId}
          ></TimeCard>
        );
      })}
    </Box>
  );
};
export default TimePicker;
