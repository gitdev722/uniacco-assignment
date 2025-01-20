import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/redux/slices/favouritesSlice";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: any) =>
    state.favorites.favorites.some((fav: Product) => fav.id === product.id),
  );

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <tr className="text-sm text-center border">
      <td className="p-2 border">{product.title}</td>
      <td className="p-2 border">${product.price}</td>
      <td className="p-2 border">{product.category}</td>
      <td className="p-2 border">
        <button
          className={`rounded p-2 ${isFavorite ? "bg-red-400 text-white" : "bg-gray-300"}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "Unfavorite" : "Add to Favorites"}
        </button>
      </td>
    </tr>
  );
};

export default ProductCard;
