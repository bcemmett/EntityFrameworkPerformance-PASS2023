import { useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import ProductList from './ProductList';
import { Product } from '../models/Product';

export default function ProductsTab() {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProductsRowCount, setTotalProductsRowCount] = useState<number>(139);

    async function changeProductsPage(pageModel: GridPaginationModel){
        getProducts(pageModel);
    }

    async function getProducts(pageModel: GridPaginationModel) {
        const queryParams = new URLSearchParams({
            page: pageModel?.page.toString(),
            pageSize: pageModel?.pageSize.toString(),
        });
        const response = await fetch('api/products/list-products?' + queryParams);
        const data = await response.json();
        setProducts(data);
    }

    return (
        <>
          {products && <ProductList products={products} totalRowCount={totalProductsRowCount} onChangePage={changeProductsPage} />}
        </>
    );
}