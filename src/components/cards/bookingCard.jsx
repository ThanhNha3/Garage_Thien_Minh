import React, { useContext, useEffect, useState } from "react";
import { Box, Icon, Text, useNavigate } from "zmp-ui";
import { useSelector } from "react-redux";

import { dataContext } from "../providerContext/providerContext";
import background from "../../../public/images/background.jpg";
import { fetchAllBranches } from "../redux/slices/branchSlice";
import { fetchAppointmentDetailbyId } from "../redux/slices/appointmentDetailSlice";
import { fetchRatingByAppointmentId } from "../redux/slices/ratingSlice";

const BookingCard = (data) => {
  const { formatDate, dispatch, navigate } = useContext(dataContext);
  const { id, branch_id, appointment_date, status } = data;
  const [branch, setBranch] = useState({});

  const branches = useSelector((state) => state.branches.branches);

  useEffect(() => {
    if (branches && branches.length > 0) {
      const foundBranch = branches.find((branch) => branch.id === branch_id);
      if (foundBranch) {
        setBranch(foundBranch);
      }
    }
  }, [branches]);

  return (
    <Box
      onClick={async () => {
        await dispatch(fetchAppointmentDetailbyId(id));
        await dispatch(fetchRatingByAppointmentId(id));
        navigate(`/detailsBooking?id=${id}`);
      }}
      flex
      className="flex-col gap-2 bg-[var(--white-color)] rounded-xl"
      p={4}
    >
      <Box className="text-[var(--text-disable)]">#{id}</Box>
      <Box flex className="gap-2">
        <Box>
          <img width={135} src={background} alt={branch.name || "Branch"} />
        </Box>
        <Box flex className="flex-1 flex-col gap-2">
          <Text className="sub-title">
            {branch.name || "Không có chi nhánh"}
          </Text>
          <Text className="text-[var(--text-secondary)]">
            {branch.address || "Branch Address"}
          </Text>
        </Box>
      </Box>
      <hr />
      <Box flex justifyContent="space-between">
        <Box flex alignItems="center" className="gap-2">
          <Icon icon="zi-clock-2-solid" />
          <Text>{formatDate(appointment_date)}</Text>
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
            {status === 0
              ? "Đợi xác nhận"
              : status === 1
              ? "Hoàn thành"
              : "Đã hủy"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingCard;
