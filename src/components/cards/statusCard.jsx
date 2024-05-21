import React from "react";
import { Box, Text } from "zmp-ui";

const StatusCard = (status) => {
  return (
    <Box
      p={2}
      className="rounded text-[var(--white-color)] w-fit"
      style={{
        background:
          status.status === 2
            ? "red"
            : status.status === 1
            ? "var(--primary-color)"
            : "var(--secondary-color)",
      }}
    >
      <Text size="xxSmall">
        {
          <Text size="xxSmall">
            {status.status === 2
              ? "Đã hủy"
              : status.status === 1
              ? "Hoàn thành"
              : "Đợi xác nhận"}
          </Text>
        }
      </Text>
    </Box>
  );
};

export default StatusCard;
