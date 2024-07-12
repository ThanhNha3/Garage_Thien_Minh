import React, { useState, useContext, useEffect, lazy, Suspense } from "react";
import { Box, Header, Input, Text } from "zmp-ui";
import { dataContext } from "../components/providerContext/providerContext";
import EmptyData from "../components/emptyData/emptyData";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const ProductList = lazy(() => import("../components/productList/productList"));
const CategoryNavbar = lazy(() =>
  import("../components/categoryNavbar/categoryNavbar")
);

const products = (state) => state.products.products;
const categories = (state) => state.categories.categories;

const productPageData = createSelector(
  [products, categories],
  (products, categories) => ({
    products: products,
    categories: categories,
  })
);

const ProductPage = () => {
  // Lấy dữ liệu từ dataContext
  const { formatCurrency, navigate } = useContext(dataContext);

  //Lấy các dữ liệu từ Store
  const { products, categories } = useSelector(productPageData);

  const productsSelected = useSelector(
    (state) => state.productsSelected.productsSelected
  );

  // Set state cho id category và products theo category_id và tổng tiền
  const [state, setState] = useState("all");
  const [idActiveCategory, setIdActiveCategory] = useState(1);
  const [productList, setProductList] = useState(products);
  const [totalMoney, setTotalMoney] = useState(0);

  useEffect(() => {
    setTotalMoney(() => {
      return productsSelected.reduce((acc, currentValue) => {
        return (acc += Number(currentValue.price));
      }, 0);
    });
  }, [productsSelected]);

  useEffect(() => {
    setProductList(() =>
      products.filter((product) => product.category_id === idActiveCategory)
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
      {productsSelected.length > 0 ? (
        <Box className="absolute bottom-0 w-full" px={4}>
          <Box
            className="bg-[var(--secondary-color)] rounded text-white"
            flex
            justifyContent="space-between"
            p={4}
          >
            <Box>
              {productsSelected.length} dịch vụ - {formatCurrency(totalMoney)}
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
