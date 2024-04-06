import { Box, Text, Icon } from "zmp-ui";
import { memo } from "react";

const EmptyData = (data) => {
  const { description } = data;
  return (
    <Box
      className="bg-[var(--white-color)] flex-col gap-2"
      flex
      justifyContent="center"
      alignItems="center"
      style={{ height: "calc(100vh - 271px)" }}
    >
      <Icon icon="zi-note-delete" size={36} />
      <Text size="xLarge" className="sub-title">
        Trống
      </Text>
      <Text className="text-[var(--text-disable)]">{description}</Text>
    </Box>
  );
};

export default EmptyData;
