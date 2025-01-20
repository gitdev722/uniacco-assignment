import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

const FavoritesPage = () => {
	const favorites = useSelector((state: any) => state.favorites.favorites);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Favorite Products</h1>
			{favorites.length === 0 ? (
				<p className="text-gray-600">No favorite products added yet!</p>
			) : (
				<table className="w-full border-collapse">
					<thead>
						<tr>
							<th className="border p-2">Title</th>
							<th className="border p-2">Price</th>
							<th className="border p-2">Category</th>
							<th className="border p-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{favorites.map((product: Product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default FavoritesPage;
