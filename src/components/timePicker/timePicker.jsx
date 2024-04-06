import { useEffect, useState } from "react";
import { Box } from "zmp-ui";
import TimeCard from "../cards/timePickerCard";
import Store from "../redux/store";

const TimePicker = () => {
  const [currentTimePickerId, setCurrentTimePickerId] = useState();

  const [timers, setTimers] = useState([]);

  useEffect(() => {
    setCurrentTimePickerId(Store.getState().timePicker);
    setTimers(Store.getState().listTimePicker);
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
