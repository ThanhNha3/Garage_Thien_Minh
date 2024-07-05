import React, {
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { Box, Text, Icon } from "zmp-ui";

import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import HeaderPage from "../components/headerPage/headerPage";
import { dataContext } from "../components/providerContext/providerContext";
import { setAppoinmentToDefault } from "../components/redux/slices/appointmentDetailSlice";
import { fetchAllAppointments } from "../components/redux/slices/appointmentSlice";

const BookingCard = lazy(() => import("../components/cards/bookingCard"));

const Booking = () => {
  const { dispatch, navigate, userInfo } = useContext(dataContext);
  const appointmentsFromStore = useSelector(
    (state) => state.appointments.appointments
  );

  useEffect(() => {
    dispatch(fetchAllAppointments(Number(userInfo.id)));
    dispatch(setAppoinmentToDefault());
  }, [appointmentsFromStore]);

  // Lấy appointments
  const data = useSelector((state) => state.appointments.appointments);

  // Lấy ra sản phẩm
  const [listAppointments, setListAppointments] = useState([]);

  //Dùng cho tab
  const [appointmentTab, setAppointmentTab] = useState("all");

  // Set status appointments muốn hiển thị
  const [statusAppointment, setStatusAppointment] = useState([0]);

  // Cập nhật listAppointments khi data hoặc statusAppointment thay đổi
  useEffect(() => {
    setListAppointments(() => {
      if (statusAppointment.length >= 2) {
        let [success, reject] = statusAppointment;
        return data.filter((appointment) => {
          return (
            appointment.status === success || appointment.status === reject
          );
        });
      } else {
        return data.filter(
          (appointment) => appointment.status === statusAppointment[0]
        );
      }
    });
  }, [data, statusAppointment, appointmentsFromStore]);

  const handleNavigate = useCallback(() => {
    navigate("/branches");
  }, [navigate]);

  const buttonStyle = useMemo(
    () => ({ background: "var(--primary-color)" }),
    []
  );

  return (
    <Box
      className={
        listAppointments.length > 0
          ? "bg-[var(--background-grey)]"
          : "bg-[var(--white-color)] "
      }
      style={{ minHeight: "100vh" }}
    >
      <HeaderPage title="Quản lí đặt lịch" />
      <Box
        flex
        justifyContent="space-between"
        className="bg-[var(--white-color)]"
        px={4}
      >
        <Box
          alignItems="center"
          onClick={() => {
            setAppointmentTab("all");
            setStatusAppointment([0]);
          }}
          style={
            appointmentTab === "all"
              ? {
                  borderBottom: "var(--primary-color) solid 3px",
                  color: "var(--primary-color)",
                }
              : {}
          }
          className="flex-1 sub-title"
          py={2}
        >
          <Text className="text-center sub-title">Tất cả</Text>
        </Box>
        <Box
          alignItems="center"
          onClick={() => {
            setAppointmentTab("history");
            setStatusAppointment([1, 2]);
          }}
          style={
            appointmentTab === "history"
              ? {
                  borderBottom: "var(--primary-color) solid 3px",
                  color: "var(--primary-color)",
                }
              : {}
          }
          className="flex-1 sub-title"
          py={2}
        >
          <Text className="text-center sub-title">Lịch sử</Text>
        </Box>
      </Box>
      <Box>
        {listAppointments.length > 0 ? (
          <Box pt={4} flex className="flex-col gap-2">
            <Suspense fallback={<Box>Đang tải</Box>}>
              {listAppointments.map((item) => (
                <BookingCard key={item.id} id {...item} />
              ))}
            </Suspense>
          </Box>
        ) : (
          <Box
            className="bg-[var(--white-color)] flex-col gap-2"
            flex
            justifyContent="center"
            alignItems="center"
            style={{ height: "calc(100vh - 220px)" }}
          >
            <Icon icon="zi-note-delete" size={36} />
            <Text size="xLarge" className="sub-title">
              Không có lịch hẹn
            </Text>
            <Text className="text-[var(--text-disable)]">
              Vui lòng tạo lịch hẹn mới
            </Text>
          </Box>
        )}
      </Box>
      <Box
        className="sticky bg-[var(--white-color)] w-full top-full"
        flex
        justifyContent="center"
        alignItems="center"
        py={2}
        px={4}
      >
        <ButtonNavigate
          page="/branches"
          style={buttonStyle} //style cần phải dùng luôn useMemo vì mỗi lần re-render lại nó sẽ tạo mới lại
          title="Tạo lịch hẹn mới"
          action={handleNavigate}
        ></ButtonNavigate>
      </Box>
    </Box>
  );
};

export default Booking;
