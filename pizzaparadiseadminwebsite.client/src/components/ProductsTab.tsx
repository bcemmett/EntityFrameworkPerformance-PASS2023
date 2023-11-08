import React, { useState } from 'react';
import { Category } from '../models/Category';
import { GridPaginationModel } from '@mui/x-data-grid';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import { Product } from '../models/Product';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function ProductsTab() {
    const [categoriesOrProducts, setCategoriesOrProducts] = useState<string>('categories');
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalCategoriesRowCount, setTotalCategoriesRowCount] = useState<number>(8);
    const [totalProductsRowCount, setTotalProductsRowCount] = useState<number>(139);

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

    return (
        <>
        <FormControl>
            <RadioGroup row name="row-radio-buttons-group" value={categoriesOrProducts} onChange={handleCategoryVsPRoductSwitch}>
                <FormControlLabel value="categories" control={<Radio />} label="Categories" />
                <FormControlLabel value="products" control={<Radio />} label="Products" />
            </RadioGroup>
          </FormControl>
          {categoriesOrProducts == 'categories' && <CategoryList categories={categories} totalRowCount={totalCategoriesRowCount} onChangePage={changeCategoriesPage} />}
          {categoriesOrProducts == 'products' && <ProductList products={products} totalRowCount={totalProductsRowCount} onChangePage={changeProductsPage} />}
        </>
    );
}