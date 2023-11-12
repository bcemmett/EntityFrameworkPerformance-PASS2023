import { Address } from '../models/Address';
import { DataGrid, GridColDef, GridSortDirection } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

interface AddressListProps{
    addresses: Address[];
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

export default function AddressList({addresses}: AddressListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Address1', headerName: 'Address', sortingOrder: ascendingSort, flex: 40},
    {field: 'City', headerName: 'City', sortingOrder: ascendingSort, flex: 20},
    {field: 'x', headerName: '', sortingOrder: ascendingSort, flex: 20, renderCell: RenderCellButton},
  ]

  const pageSizeOptions = [10, 100];

  function getRowId(row: Address) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <Typography variant="h6" color="inherit" component="div">
          Address history
      </Typography>
      <DataGrid
        rows={addresses}
        columns={columns}
        getRowId={getRowId}
        pageSizeOptions={pageSizeOptions}
        initialState={{
          columns: {
            columnVisibilityModel: {
              Id: false,
            },
          },
          sorting: {
            sortModel: [{ field: 'Address1', sort: 'asc' }],
          },
        }}
        density='compact'
      />
    </Box>
  );
}