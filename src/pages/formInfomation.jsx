import React, { useState, useContext, useEffect } from "react";
import { Box, Input, Text, useNavigate } from "zmp-ui";

import HeaderPage from "../components/headerPage/headerPage";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import { dataContext } from "../components/providerContext/providerContext";
import { updateCustomerInformation } from "../components/redux/slices/customerInformationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const nameRegex =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const addressRegex =
  /[^a-z0-9A-Z_&#192;ÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const FormInformation = () => {
  const dispatch = useDispatch();
  const { branch_id } = useParams("branch_id");
  const { customerName, setCustomerName } = useState("");
  const { userInfo, navigate } = useContext(dataContext);
  const [customerType, setCustomerType] = useState(0);

  const [statusName, setStatusName] = useState("");
  const [statusPhone, setStatusPhone] = useState("");
  const [statusAddress, setStatusAddress] = useState("");
  const [statusEmail, setStatusEmail] = useState("");

  // Lấy thông tin từ store
  const customerInformation = useSelector(
    (state) => state.customerInformation.customerInformation
  );

  const handleChangeValue = (e, setFunction, regex) => {
    const { value } = e.target;
    if (regex.test(value)) {
      setFunction("");
    } else {
      setFunction("error");
    }
  };
  const checkRegex = (name, regex) => {
    return regex.test(name);
  };
  const handleSubmitOrder = () => {
    try {
      const formOrder = document.getElementById("form-order");
      const formData = new FormData(formOrder);
      const customer_type = formData.get("customer");
      const name = formData.get("name");
      const phone = formData.get("phone");
      const address = formData.get("address");
      const email = formData.get("email");
      const note = formData.get("note");
      if (
        checkRegex(name, nameRegex) &&
        checkRegex(phone, phoneRegex) &&
        checkRegex(address, addressRegex) &&
        checkRegex(email, emailRegex)
      ) {
        // xử lí ở đây
        const data = { customer_type, name, phone, address, email, note };
        dispatch(updateCustomerInformation(data));
        navigate(`/confirminformation/${branch_id}`);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <HeaderPage title="Thông tin người đặt" />
      <Box
        px={4}
        flex
        flexDirection="column"
        className="gap-2 bg-[var(--white-color)]"
        style={{ paddingBottom: "100px" }}
      >
        <Box pt={4}>
          <Text className="sub-title">Bạn đặt dịch vụ này cho ai?</Text>
        </Box>
        <form id="form-order">
          <Box flex flexDirection="column" className="gap-2">
            <Box flex className="gap-4">
              <input
                style={{ transform: "scale(1.5)" }}
                type="radio"
                id="myself"
                name="customer"
                value={0}
                checked={customerType === 0}
                onChange={() => setCustomerType(0)}
              />
              <label htmlFor="myself">Cho tôi</label>
            </Box>
            <Box flex className="gap-4">
              <input
                style={{ transform: "scale(1.5)" }}
                type="radio"
                id="other"
                name="customer"
                value={1}
                checked={customerType === 1}
                onChange={() => setCustomerType(1)}
              />
              <label htmlFor="other">Cho người khác</label>
            </Box>
          </Box>
          <Box pt={4} flex flexDirection="column" className="gap-4">
            <Text className="sub-title">Thông tin người đặt</Text>
            <Input
              status={statusName}
              label="Họ và tên"
              onChange={(e) => {
                setCustomerName(e.target.value);
              }}
              value={customerType === 0 ? userInfo.name : customerName}
              name="name"
              errorText="Vui lòng nhập đúng định dạng họ tên"
              onChange={(e) => handleChangeValue(e, setStatusName, nameRegex)}
            />
            <Input
              status={statusPhone}
              label="Số diện thoại"
              name="phone"
              errorText="Vui lòng nhập đúng định dạng số điện thoại"
              onChange={(e) => handleChangeValue(e, setStatusPhone, phoneRegex)}
            />
            <Input
              status={statusEmail}
              label="Email"
              name="email"
              errorText="Vui lòng nhập đúng định dạng email"
              onChange={(e) => handleChangeValue(e, setStatusEmail, emailRegex)}
            />
            <Input
              label="Địa chỉ (đường, số nhà, thành phố)"
              status={statusAddress}
              name="address"
              errorText="Vui lòng nhập đúng định dạng"
              onChange={(e) =>
                handleChangeValue(e, setStatusAddress, addressRegex)
              }
            />
            <Input.TextArea label="Ghi chú (nếu có)" name="note" />
          </Box>
        </form>
      </Box>
      <Box
        className="fixed bottom-0 bg-[var(--white-color)] w-full gap-4"
        flex
        justifyContent="center"
        alignItems="center"
        py={2}
        px={4}
        style={{ boxShadow: "-5px 0px 5px 1px var(--text-disable)" }}
      >
        <ButtonNavigate
          title="Tiếp tục"
          style={{ borderRadius: 10, background: "var(--primary-color)" }}
          action={handleSubmitOrder}
        ></ButtonNavigate>
      </Box>
    </Box>
  );
};

export default FormInformation;
