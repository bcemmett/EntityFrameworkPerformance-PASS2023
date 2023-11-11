import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Order } from '../models/Order';

interface OrderListProps{
    orders: Order[];
    totalRowCount: number;
    onChangePage: (pageModel: GridPaginationModel) => void;
}

function RenderCellButton() {
  return (
    <strong>
      <Button size="small" style={{ marginLeft: 16 }}>
        Manage
      </Button>
    </strong>
  );
}

export default function OrderList({orders, totalRowCount, onChangePage}: OrderListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Restaurant', headerName: 'Restaurant', sortingOrder: ascendingSort, flex: 20},
    {field: 'TimeReceived', headerName: 'Received', sortingOrder: ascendingSort, flex: 30},
    {field: 'Total', headerName: 'Total', sortingOrder: ascendingSort, flex: 30},
    {field: 'VoucherCode', headerName: 'Voucher', sortingOrder: ascendingSort, flex: 30},
    {field: 'x', headerName: '', sortingOrder: ascendingSort, flex: 20, renderCell: RenderCellButton},
  ]

  const pageSizeOptions = [20, 50];

  const [rowCountState, setRowCountState] = useState(
    totalRowCount || 0,
  );

  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: pageSizeOptions[0],
  });

  useEffect(() => {
    onChangePage(pageModel);
  }, [pageModel]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalRowCount !== undefined
        ? totalRowCount
        : prevRowCountState,
    );
  }, [totalRowCount, setRowCountState]);

  function getRowId(row: Order) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <DataGrid
        rows={orders}
        columns={columns}
        getRowId={getRowId}
        rowCount={rowCountState}
        paginationMode='server'
        pageSizeOptions={pageSizeOptions}
        paginationModel={pageModel}
        onPaginationModelChange={setPageModel}
        initialState={{
          sorting: {
            sortModel: [{ field: 'Id', sort: 'desc' }],
          },
        }}
        density='compact'
      />
    </Box>
  );
}