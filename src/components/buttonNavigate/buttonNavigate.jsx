import React from "react";
import { Box, Button, useNavigate } from "zmp-ui";

const ButtonNavigate = ({
  page,
  title,
  hasChat,
  isSubmit,
  isNavigate,
  isCancel,
  style,
  action,
}) => {
  return (
    <Button style={style} className="" fullWidth onClick={action}>
      {title}
    </Button>
  );
};

export default ButtonNavigate;
