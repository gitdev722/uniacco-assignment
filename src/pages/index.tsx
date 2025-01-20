import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [sortOption, setSortOption] = useState<string>("");
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState<boolean>(false);

	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
	const currentProducts = filteredProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/products");
			console.log(response);
			setProducts(response?.data);
			setFilteredProducts(response?.data);
			setCategories([
				...new Set(
					(response.data as Product[]).map(
						(product: Product) => product.category
					)
				),
			]);
			setLoading(false);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		let updatedProducts = [...products];

		if (selectedCategory) {
			updatedProducts = updatedProducts.filter(
				(product) => product.category === selectedCategory
			);
		}

		if (sortOption === "asc") {
			updatedProducts.sort((a, b) => a.price - b.price);
		} else if (sortOption === "desc") {
			updatedProducts.sort((a, b) => b.price - a.price);
		}

		setFilteredProducts(updatedProducts);
		setCurrentPage(1); // Reset to the first page after filtering
	}, [selectedCategory, sortOption, products]);

	useEffect(() => {
		let updatedProducts = [...products];

		if (selectedCategory) {
			updatedProducts = updatedProducts.filter(
				(product) => product.category === selectedCategory
			);
		}

		if (sortOption === "asc") {
			updatedProducts.sort((a, b) => a.price - b.price);
		} else if (sortOption === "desc") {
			updatedProducts.sort((a, b) => b.price - a.price);
		}

		setFilteredProducts(updatedProducts);
	}, [selectedCategory, sortOption, products]);

	const columns = [
		{ header: "Title", accessor: "title" },
		{ header: "Price", accessor: "price" },
		{ header: "Category", accessor: "category" },
		{ header: "Actions", accessor: "actions" },
	];

	return (
		<div>
			<div className="flex gap-4 mb-4 items-center">
				<select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className="border border-black rounded-lg p-2">
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				<select
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
					className="border border-black rounded-lg p-2">
					<option value="">Sort by</option>
					<option value="asc">Price: Low to High</option>
					<option value="desc">Price: High to Low</option>
				</select>
				<Link className="text-blue-500 underline" href="/favourites">
					Go to Favourites
				</Link>
			</div>
			<table className="w-full border-collapse border">
				<thead>
					<tr className="border">
						<th className="border p-2">Title</th>
						<th className="border p-2">Price</th>
						<th className="border p-2">Category</th>
						<th className="border p-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan={4} className="text-center py-4">
								<div className="flex justify-center items-center">
									<div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
									<span className="ml-2">Loading...</span>
								</div>
							</td>
						</tr>
					) : (
						currentProducts?.map((product) => (
							<ProductCard key={product.id} product={product} />
						))
					)}
				</tbody>
			</table>

			{!loading && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
}
