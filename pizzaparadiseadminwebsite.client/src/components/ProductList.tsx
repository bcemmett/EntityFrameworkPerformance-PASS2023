import { useState, useEffect } from 'react';
import { Product } from '../models/Product';
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface ProductListProps{
    products: Product[];
    totalRowCount: number;
    onChangePage: (pageModel: GridPaginationModel) => void;
}

export default function ProductList({products, totalRowCount, onChangePage}: ProductListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Name', headerName: 'Name', sortingOrder: ascendingSort, flex: 20},
    {field: 'Description', headerName: 'Description', sortingOrder: ascendingSort, flex: 40},
    {field: 'Available', headerName: 'Available', sortingOrder: ascendingSort, flex: 40},
    {field: 'CurrentPrice', headerName: 'Price', sortingOrder: ascendingSort, flex: 40},
  ]

  const pageSizeOptions = [100];

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

  function getRowId(row: Product) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={getRowId}
        rowCount={rowCountState}
        paginationMode='server'
        pageSizeOptions={pageSizeOptions}
        paginationModel={pageModel}
        onPaginationModelChange={setPageModel}
        initialState={{
          columns: {
            columnVisibilityModel: {
              Id: false,
            },
          },
          sorting: {
            sortModel: [{ field: 'Name', sort: 'desc' }],
          },
        }}
        density='compact'
      />
    </Box>
  );
}