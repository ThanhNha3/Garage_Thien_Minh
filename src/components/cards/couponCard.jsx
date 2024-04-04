import React from "react";
import { Box, Text } from "zmp-ui";

const CouponCard = (data) => {
  const {
    id,
    product_id,
    name,
    range,
    description,
    title,
    value,
    start_date,
    end_date,
    status,
    create_at,
    update_at,
    orders,
  } = data;

  return (
    <Box
      flex
      className="gap-4 bg-[var(--white-color)]"
      p={2}
      justifyContent="space-between"
    >
      <Box
        flex
        p={2}
        style={{ flexDirection: "column" }}
        className={
          status === 1
            ? "bg-[var(--primary-color)]"
            : "bg-[var(--text-disable)]"
        }
        alignItems="center"
      >
        <div className="rounded-full bg-[var(--white-color)] p-4">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAXBJREFUSEvtluttAkEMhE0noRNSSaCShEqSVAKdJJ0k96E1mvV570Wk+5GzhIBb74w99u55ZyvZbiVeGyM+mtnTwuCuZvZdPj2IIeKLmR0Wkvq2cxf4R0beIn4zs9cHSZUcvMoyYqT9Kl5ItS+/9TmZOBjleC8++LIHA8PLpM9vixmxZvvcyU2tMCXQ55SDsmCnIi2/FUcDTYk1KwghcFOgGPBPcYoE2idV1hGg6ViyIjuV34NyWWOwJAIm36yhyK0USjwoTddsrazAocaUIiuf4t5LocStJgFMS8DxAEBNiWMjpU2pxNoksVYKDKGCKzBrBMZ+727de2/KoRr7zUNA2e3l3Z5dMpCyrnur+kdizTqo+fBfPYK9c7wR0yifQeQXOTpz9J8lde+qC1fhqsTZO5dTEE/Cn2dcARYJsnf5LOIpUm7EqLRJjQqDzYWDzkpTmmtsfHKMyq81ZU4da5tzcxiNe35jA/2UjBf5/D/iX8oqex990uM3AAAAAElFTkSuQmCC" />
        </div>
        <Text
          className="text-[var(--white-color)]"
          style={{ width: "69px", fontSize: "12px", textAlign: "center" }}
        >
          Áp dụng tại {range}
        </Text>
      </Box>
      <Box flex className="flex-col flex-1">
        <Box flex className="flex-col gap-2">
          <div
            className="p-2 rounded text-[var(--white-color)] w-fit"
            style={
              status === 1
                ? { background: "var(--primary-color)" }
                : { background: "var(--text-disable)" }
            }
          >
            <Text>Giảm giá</Text>
          </div>
          <div className="sub-title">{title}</div>
          <div className="text-danger">hết hạn vào {end_date}</div>
        </Box>
        <Box flex style={{ justifyContent: "right" }}>
          <button
            type="button"
            disabled={status === 1 ? false : true}
            className="p-2 rounded text-[var(--primary-color)] w-fit cursor-arrow"
            style={
              status === 1
                ? { border: "var(--primary-color) solid 1px" }
                : {
                    color: "var(--text-disable)",
                  }
            }
          >
            <Text size="xxSmall">
              {status === 1 ? "Áp dụng" : "Đã dùng"}
            </Text>
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default CouponCard;
