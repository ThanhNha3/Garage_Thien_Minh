import { useEffect, useState } from "react";
import { Box } from "zmp-ui";
import { ChangeTimePicker } from "../redux/actions/timePickerAction";
import Store from "../redux/store";

const TimeCard = (data) => {
  const { id, time, isActive } = data;

  return (
    <Box
      onClick={() => Store.dispatch(ChangeTimePicker(id))}
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
