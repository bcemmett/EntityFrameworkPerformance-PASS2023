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
    {field: 'id', headerName: 'Id'},
    {field: 'name', headerName: 'Restaurant', sortingOrder: ascendingSort, flex: 20},
    {field: 'phone', headerName: 'Phone Number', sortingOrder: ascendingSort, flex: 40},
  ]

  return (
    <Box sx={{width:'100%'}}>
      <DataGrid
        rows={restaurants}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
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