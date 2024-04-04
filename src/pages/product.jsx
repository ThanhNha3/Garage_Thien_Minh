import React, { useState, useContext, useEffect } from "react";
import { Box, Header, Input, Text, Icon, useNavigate } from "zmp-ui";
import CategoryCard from "../components/cards/categoryCard";
import ProductCard from "../components/cards/productCard";
import Store from "../components/redux/store";

import { dataContext } from "../components/providerContext/providerContext";

const ProductPage = () => {
  const [state, setState] = useState("all");
  const [idActiveCategory, setIdActiveCategory] = useState(1);
  const [listCategories, setListCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [listProductSelected, setListProductSelected] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const { formatCurrency } = useContext(dataContext);

  const navigate = useNavigate();

  useEffect(() => {
    setListCategories(Store.getState().categories);
    setListProductSelected(Store.getState().productsSelected);
  }, []);

  useEffect(() => {
    Store.subscribe(() => {
      setListProductSelected(Store.getState().productsSelected);
    });
  }, [Store.getState().productsSelected]);

  useEffect(() => {
    setTotalMoney(() => {
      return listProductSelected.reduce((acc, currentValue) => {
        return (acc += currentValue.price);
      }, 0);
    });
  }, [listProductSelected]);

  useEffect(() => {
    setProductList(() =>
      Store.getState().products.filter(
        (product) => product.category_id === idActiveCategory
      )
    );
  }, [idActiveCategory]);

  return (
    <Box>
      <Header
        className="header-sticky"
        title={
          <Box>
            <Input.Search
              style={{ height: "30px" }}
              placeholder="Tìm kiếm dịch vụ"
            />
          </Box>
        }
      ></Header>
      <Box
        flex
        justifyContent="space-between"
        className="bg-[var(--white-color)]"
        px={4}
      >
        <Box
          alignItems="center"
          onClick={() => {
            setState("all");
          }}
          style={
            state === "all"
              ? {
                  borderBottom: "var(--primary-color) solid 3px",
                  color: "var(--primary-color)",
                }
              : {}
          }
          className="flex-1 sub-title"
          py={2}
        >
          <Text className="text-center sub-title">Tất cả dịch vụ</Text>
        </Box>
        <Box
          alignItems="center"
          onClick={() => {
            setState("history");
          }}
          style={
            state === "history"
              ? {
                  borderBottom: "var(--primary-color) solid 3px",
                  color: "var(--primary-color)",
                }
              : {}
          }
          className="flex-1 sub-title"
          py={2}
        >
          <Text className="text-center sub-title">Liệu trình đã mua</Text>
        </Box>
      </Box>
      <Box flex p={4} className="gap-4 overflow-scroll">
        {listCategories.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              idActive={idActiveCategory}
              setIdActiveFnc={setIdActiveCategory}
              {...category}
            />
          );
        })}
      </Box>
      {productList && productList.length > 0 ? (
        <Box
          p={4}
          style={{ display: "grid", paddingBottom: "70px" }}
          className="grid-cols-2 gap-4 bg-[var(--white-color)]"
        >
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              setListProductSelected={setListProductSelected}
            />
          ))}
        </Box>
      ) : (
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
          <Text className="text-[var(--text-disable)]">
            Xin lỗi chúng tôi đã hết dịch vụ này
          </Text>
        </Box>
      )}
      {listProductSelected.length > 0 ? (
        <Box className="absolute bottom-0 w-full" px={4}>
          <Box
            className="bg-[var(--secondary-color)] rounded text-white"
            flex
            justifyContent="space-between"
            p={4}
          >
            <Box>
              {listProductSelected.length} dịch vụ -{" "}
              {formatCurrency(totalMoney)}
            </Box>
            <Box>
              <button onClick={() => navigate(-1)}>Tiếp tục</button>
            </Box>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ProductPage;
