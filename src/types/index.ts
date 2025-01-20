export interface Product {
  id?: number;
  title: string;
  price: number;
  category: string;
}
export interface FavoritesState {
  favorites: Product[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
