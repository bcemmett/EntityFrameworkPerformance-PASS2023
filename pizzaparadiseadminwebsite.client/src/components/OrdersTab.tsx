import { useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import { Order } from '../models/Order';
import OrderList from './OrderList';
import { Typography } from '@mui/material';

export default function OrdersTab() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalRowCount, setTotalRowCount] = useState<number>(21499391);

    async function changePage(pageModel: GridPaginationModel){
        getOrders(pageModel);
    }

    async function getOrders(pageModel: GridPaginationModel) {
        const queryParams = new URLSearchParams({
            page: pageModel?.page.toString(),
            pageSize: pageModel?.pageSize.toString(),
        });
        const response = await fetch('api/orders/list-recent-orders?' + queryParams);
        const data = await response.json();
        setOrders(data);
    }

    return (
        <>
          <Typography variant="h4" color="inherit" component="div">
            Recent orders
          </Typography>
          <OrderList orders={orders} totalRowCount={totalRowCount} onChangePage={changePage} />
        </>
    );
}