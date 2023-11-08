import { useState, useEffect } from 'react';
import { Account } from '../models/Account';
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface AccountListProps{
    accounts: Account[];
    totalRowCount: number;
    onChangePage: (pageModel: GridPaginationModel) => void;
}

export default function AccountList({accounts, totalRowCount, onChangePage}: AccountListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Name', headerName: 'Name', sortingOrder: ascendingSort, flex: 20},
    {field: 'Email', headerName: 'Email', sortingOrder: ascendingSort, flex: 40},
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

  function getRowId(row: Account) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <DataGrid
        rows={accounts}
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