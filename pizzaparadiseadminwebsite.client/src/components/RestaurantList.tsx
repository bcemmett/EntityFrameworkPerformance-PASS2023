import { useState, useEffect } from 'react';
import { Restaurant } from '../models/Restaurant';
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface RestaurantListProps{
    restaurants: Restaurant[];
    totalRowCount: number;
    onChangePage: (pageModel: GridPaginationModel) => void;
}

export default function RestaurantList({restaurants, totalRowCount, onChangePage}: RestaurantListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Name', headerName: 'Restaurant', sortingOrder: ascendingSort, flex: 20},
    {field: 'PhoneNumber', headerName: 'Phone Number', sortingOrder: ascendingSort, flex: 40},
  ]

  const pageSizeOptions = [10, 20];

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

  function getRowId(row: Restaurant) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <DataGrid
        rows={restaurants}
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