import React, { useEffect, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import Store from "../redux/store";

const BookingCard = (data) => {
  const {
    id,
    branch_id,
    appointment_date,
    status,
  } = data;
  const [branch, setbranch] = useState({});
  useEffect(() => {
    setbranch(() => {
      return Store.getState().branches.find(
        (branch) => branch.id === branch_id
      );
    });
  }, [Store.getState().branches]);

  return (
    <Box
      flex
      className="flex-col gap-2 bg-[var(--white-color)] rounded-xl"
      p={4}
    >
      <Box className="text-[var(--text-disable)]">#{id}</Box>
      <Box flex className="gap-2">
        <Box>
          <img width={135} src={branch.image} alt={branch.name} />
        </Box>
        <Box flex className="flex-1 flex-col gap-2">
          <Text className="sub-title">{branch.name}</Text>
          <Text className="text-[var(--text-secondary)]">{branch.address}</Text>
        </Box>
      </Box>
      <hr />
      <Box flex justifyContent="space-between">
        <Box flex alignItems="center" className="gap-2">
          <Icon icon="zi-clock-2-solid" />
          <Text>{appointment_date}</Text>
        </Box>
        <Box
          p={2}
          className="rounded text-[var(--white-color)] w-fit"
          style={{
            background:
              status === 0
                ? "var(--secondary-color)"
                : status === 1
                ? "var(--primary-color)"
                : "red",
          }}
        >
          <Text size="xxSmall">
            {
              <Text size="xxSmall">
                {status === 0
                  ? "Đợi xác nhận"
                  : status === 1
                  ? "Hoàn thành"
                  : "Đã hủy"}
              </Text>
            }
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingCard;
