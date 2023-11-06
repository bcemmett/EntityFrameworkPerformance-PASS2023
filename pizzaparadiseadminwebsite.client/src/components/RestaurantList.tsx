import { useState, useEffect } from 'react';
import { Restaurant } from '../models/Restaurant';
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface RestaurantListProps{
    restaurants: Restaurant[];
    pageModel: GridPaginationModel;
    totalRowCount: number;
    onChangePage: (pageModel: GridPaginationModel) => void;
}

export default function RestaurantList({restaurants, pageModel, totalRowCount, onChangePage}: RestaurantListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Name', headerName: 'Restaurant', sortingOrder: ascendingSort, flex: 20},
    {field: 'PhoneNumber', headerName: 'Phone Number', sortingOrder: ascendingSort, flex: 40},
  ]

  const [rowCountState, setRowCountState] = useState(
    totalRowCount || 0,
  );

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
        pageSizeOptions={[10, 20]}
        paginationModel={pageModel}
        onPaginationModelChange={onChangePage}
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