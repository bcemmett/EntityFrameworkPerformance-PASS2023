import { PaymentCard } from '../models/PaymentCard';
import { DataGrid, GridColDef, GridSortDirection, GridValueFormatterParams } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

interface PaymentCardListProps{
    paymentCards: PaymentCard[];
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

function RedactCardNumber(params: GridValueFormatterParams) : string {
  //Obviously doing this in the ui is just for the demo visual...
  const cardNumber : string= params.value;
  return '****-****-****-' + cardNumber.substring(12);
}

export default function PaymentCardList({paymentCards}: PaymentCardListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'CardType', headerName: 'Type', sortingOrder: ascendingSort, flex: 20},
    {field: 'CardNumber', headerName: 'Number', sortingOrder: ascendingSort, flex: 20, valueFormatter: RedactCardNumber},
    {field: 'ExpiryDate', headerName: 'Expires', sortingOrder: ascendingSort, flex: 10},
    {field: 'x', headerName: '', sortingOrder: ascendingSort, flex: 20, renderCell: RenderCellButton},
  ]

  const pageSizeOptions = [10, 100];

  function getRowId(row: PaymentCard) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <Typography variant="h6" color="inherit" component="div">
          Payment cards
      </Typography>
      <DataGrid
        rows={paymentCards}
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
            sortModel: [{ field: 'ExpiryDate', sort: 'desc' }],
          },
        }}
        density='compact'
      />
    </Box>
  );
}