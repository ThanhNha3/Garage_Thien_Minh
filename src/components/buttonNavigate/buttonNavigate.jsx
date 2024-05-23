import React, { memo } from "react";
import { Button } from "zmp-ui";

const ButtonNavigate = ({
  title,
  style,
  action,
}) => {
  return (
    <Button style={style} className="" fullWidth onClick={action}>
      {title}
    </Button>
  );
};

export default memo(ButtonNavigate);
