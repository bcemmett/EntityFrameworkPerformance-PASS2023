import { DataGrid, GridColDef, GridSortDirection } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Order } from '../models/Order';

interface AccountOrdersHistoryListProps{
  orders: Order[];
}

function RenderCellButton() {
  return (
    <strong>
      <Button size="small" style={{ marginLeft: 16 }}>
        View details
      </Button>
    </strong>
  );
}

export default function AccountOrdersHistoryList({orders}: AccountOrdersHistoryListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'TimeReceived', headerName: 'Received', sortingOrder: descendingSort, flex: 30},
    {field: 'Total', headerName: 'Total', sortingOrder: ascendingSort, flex: 30},
    {field: 'VoucherCode', headerName: 'Voucher', sortingOrder: ascendingSort, flex: 30},
    {field: 'x', headerName: '', sortingOrder: ascendingSort, flex: 20, renderCell: RenderCellButton},
  ]

  const pageSizeOptions = [10, 100];

  function getRowId(row: Order) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%', paddingTop:3}}>
      <Typography variant="h6" color="inherit" component="div">
          Order history
      </Typography>
      <DataGrid
        rows={orders}
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
            sortModel: [{ field: 'TimeReceived', sort: 'desc' }],
          },
        }}
        density='compact'
      />
    </Box>
  );
}