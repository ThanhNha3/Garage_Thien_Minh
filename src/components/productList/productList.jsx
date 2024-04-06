import { Box } from "zmp-ui";
import ProductCard from "../cards/productCard";

const ProductList = (data) => {
  const { productList } = data;
  return (
    <Box
      p={4}
      style={{ display: "grid", paddingBottom: "70px" }}
      className="grid-cols-2 gap-4 bg-[var(--white-color)]"
    >
      {productList.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Box>
  );
};

export default ProductList;
