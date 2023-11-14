import { useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import ProductList from './ProductList';
import { Product } from '../models/Product';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CategoryList from './CategoryList';
import { Category } from '../models/Category';

export default function ProductsTab() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalCategoriesRowCount, setTotalCategoriesRowCount] = useState<number>(8);
    const [totalProductsRowCount, setTotalProductsRowCount] = useState<number>(139);
    const [categoriesOrProducts, setCategoriesOrProducts] = useState<string>('categories');

    async function changeCategoriesPage(pageModel: GridPaginationModel){
        getCategories(pageModel);
    }
    
    async function changeProductsPage(pageModel: GridPaginationModel){
        getProducts(pageModel);
    }

    async function getCategories(pageModel: GridPaginationModel) {
        const queryParams = new URLSearchParams({
            page: pageModel?.page.toString(),
            pageSize: pageModel?.pageSize.toString(),
        });
        const response = await fetch('api/products/list-categories?' + queryParams);
        const data = await response.json();
        setCategories(data);
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

    function handleCategoryVsPRoductSwitch(e : React.ChangeEvent<HTMLInputElement>){
        setCategoriesOrProducts(e.target.value);
    }

    async function applySpotDiscount(category: Category) {
        const queryParams = new URLSearchParams({
            categoryId: category.Id.toString(),
        });
        const response = await fetch('api/products/apply-spot-discount-to-category?' + queryParams);
        await response.text();
    }

    return (
        <>
         <FormControl>
            <RadioGroup row name="row-radio-buttons-group" value={categoriesOrProducts} onChange={handleCategoryVsPRoductSwitch}>
                <FormControlLabel value="categories" control={<Radio />} label="Categories" />
                <FormControlLabel value="products" control={<Radio />} label="Products" />
            </RadioGroup>
          </FormControl>
          {categoriesOrProducts == 'categories' && <CategoryList categories={categories} totalRowCount={totalCategoriesRowCount} onChangePage={changeCategoriesPage} onApplySpotDiscount={applySpotDiscount} />}
          {categoriesOrProducts == 'products' && <ProductList products={products} totalRowCount={totalProductsRowCount} onChangePage={changeProductsPage} />}
        </>
    );
}