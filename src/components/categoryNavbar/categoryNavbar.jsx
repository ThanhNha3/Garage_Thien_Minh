import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "zmp-ui";
import CategoryCard from "../cards/categoryCard";
import { dataContext } from "../providerContext/providerContext";
import { fetchAllCategories } from "../redux/slices/categorySlide";
import Store from "../redux/store";

const CategoryNavbar = (data) => {
  // Lấy dữ liệu từ props
  const { idActiveCategory, setIdActiveCategory } = data;

  // Lấy từ liệu từ dataContext
  const { dispatch } = useContext(dataContext);

  // Dispatch fired
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  // Lấy danh sách categories
  const categories = useSelector((state) => state.categories.categories);

  return (
    <Box flex p={4} className="gap-4 overflow-scroll">
      {categories.map((category) => {
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
  );
};

export default CategoryNavbar;
