import React, { lazy, Suspense, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Box, Icon, Text } from "zmp-ui";

import HeaderPage from "../components/headerPage/headerPage";
import { dataContext } from "../components/providerContext/providerContext";
import { fetchAllBranches } from "../components/redux/slices/branchSlice";

const BranchCard = lazy(() => import("../components/cards/branchCard"));

const BookingChooseBranch = () => {
  const listBranches = useSelector((store) => store.branches.branches);

  const { dispatch } = useContext(dataContext);

  useEffect(() => {
    dispatch(fetchAllBranches());
  }, []);

  return (
    <Box>
      <HeaderPage title="Chọn chi nhánh" />
      <Box flex flexDirection="column" className="gap-2">
        {listBranches.length > 0 ? (
          <Box flex flexDirection="column" className="gap-2" pt={2}>
            {listBranches.map((branch) => (
              <Suspense fallback={"đang load"} key={branch.id}>
                <BranchCard {...branch}></BranchCard>
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
