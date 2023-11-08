import { useState } from 'react';
import { Category } from '../models/Category';
import { GridPaginationModel } from '@mui/x-data-grid';
import CategoryList from './CategoryList';

export default function ProductsTab() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalRowCount, setTotalRowCount] = useState<number>(8);

    async function changePage(pageModel: GridPaginationModel){
        getCategories(pageModel);
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

    return (
        <>
          <CategoryList categories={categories} totalRowCount={totalRowCount} onChangePage={changePage} />
        </>
    );
}