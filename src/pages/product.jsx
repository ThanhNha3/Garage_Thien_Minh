import React, { useState, useContext, useEffect, lazy, Suspense } from "react";
import { Box, Header, Input, Text, Icon, useNavigate } from "zmp-ui";
import Store from "../components/redux/store";
import { dataContext } from "../components/providerContext/providerContext";
import EmptyData from "../components/emptyData/emptyData";

const ProductList = lazy(() => import("../components/productList/productList"));
const CategoryNavbar = lazy(() =>
  import("../components/categoryNavbar/categoryNavbar")
);

const ProductPage = () => {
  const [state, setState] = useState("all");
  const [idActiveCategory, setIdActiveCategory] = useState(1);

  const [productList, setProductList] = useState([]);
  const [listProductSelected, setListProductSelected] = useState(
    Store.getState().productsSelected
  );
  const [totalMoney, setTotalMoney] = useState(0);
  const { formatCurrency } = useContext(dataContext);
  const navigate = useNavigate();

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
      <Suspense fallback={"Đang tải..."}>
        <CategoryNavbar
          idActiveCategory={idActiveCategory}
          setIdActiveCategory={setIdActiveCategory}
        />
      </Suspense>
      {productList && productList.length > 0 ? (
        <Suspense fallback={"Đang tải..."}>
          <ProductList productList={productList} />
        </Suspense>
      ) : (
        <EmptyData description="Xin lỗi chúng tôi đã hết dịch vụ này" />
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
