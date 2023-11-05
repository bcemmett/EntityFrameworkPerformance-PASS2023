import { Restaurant } from '../models/Restaurant';
import { DataGrid, GridColDef, GridSortDirection } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface RestaurantListProps{
    restaurants: Restaurant[];
}

export default function RestaurantList({restaurants}: RestaurantListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Name', headerName: 'Restaurant', sortingOrder: ascendingSort, flex: 20},
    {field: 'PhoneNumber', headerName: 'Phone Number', sortingOrder: ascendingSort, flex: 40},
  ]

  function getRowId(row: Restaurant) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <DataGrid
        rows={restaurants}
        columns={columns}
        getRowId={getRowId}
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