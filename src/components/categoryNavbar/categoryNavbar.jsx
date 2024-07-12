import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Box } from "zmp-ui";
import CategoryCard from "../cards/categoryCard";

const categories = (state) => state.categories.categories;

const CategoriesData = createSelector([categories], (categories) => ({
  categories: categories,
}));

const CategoryNavbar = (data) => {
  // Lấy dữ liệu từ props
  const { idActiveCategory, setIdActiveCategory } = data;

  // Lấy danh sách categories
  const categories = useSelector(CategoriesData);

  return (
    <Box flex p={4} className="gap-4 overflow-scroll">
      {categories.categories.map((category) => {
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
