import { useState } from "react";
import { Box } from "zmp-ui";
import CategoryCard from "../cards/categoryCard";
import Store from "../redux/store";

const CategoryNavbar = (data) => {
  const { idActiveCategory,setIdActiveCategory  } = data;
  const [listCategories, setListCategories] = useState(
    Store.getState().categories
  );
  return (
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
  );
};

export default CategoryNavbar;
