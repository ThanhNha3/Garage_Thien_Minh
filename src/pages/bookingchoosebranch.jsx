import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Box, Icon, Text } from "zmp-ui";
import { createSelector } from "reselect";

import HeaderPage from "../components/headerPage/headerPage";

const BranchCard = lazy(() => import("../components/cards/branchCard"));

const selectBranches = createSelector(
  (state) => state.branches.branches,
  (branches) => branches
);

const BookingChooseBranch = () => {
  const listBranches = useSelector(selectBranches);

  return (
    <Box>
      <HeaderPage title="Chọn chi nhánh" />
      <Box flex flexDirection="column" className="gap-2">
        {listBranches.length > 0 ? (
          <Box flex flexDirection="column" className="gap-2" pt={2}>
            {listBranches.map((branch) => (
              <Suspense fallback={"đang load"} key={branch.id}>
                <BranchCard {...branch} />
              </Suspense>
            ))}
          </Box>
        ) : (
          <Box
            className="bg-[var(--white-color)] flex-col gap-2 h-screen"
            flex
            justifyContent="center"
            alignItems="center"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <Icon icon="zi-note-delete" size={36} />
            <Text size="xLarge" className="sub-title">
              Không có chi nhánh
            </Text>
            <Text className="text-[var(--text-disable)]">
              Vui lòng tạo lịch hẹn mới
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BookingChooseBranch;
