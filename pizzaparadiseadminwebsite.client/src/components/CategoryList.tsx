import { useState, useEffect } from 'react';
import { Category } from '../models/Category';
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

interface CategoryListProps{
    categories: Category[];
    totalRowCount: number;
    onChangePage: (pageModel: GridPaginationModel) => void;
    onApplySpotDiscount: (category: Category) => void;
}

export default function CategoryList({categories, totalRowCount, onChangePage, onApplySpotDiscount}: CategoryListProps) {
  const ascendingSort: GridSortDirection[] = ['asc', 'desc', null];
  const descendingSort: GridSortDirection[] = ['desc', 'asc', null];

  function handleSpotDiscount(e : React.MouseEvent<HTMLButtonElement, MouseEvent>, category: Category) {
    onApplySpotDiscount(category);
  }
  
  function RenderCellButton(category: Category) {
    return (
      <strong>
        <Button size="small" style={{ marginLeft: 16 }} onClick={p => handleSpotDiscount(p, category)}>
          Apply spot discount
        </Button>
      </strong>
    );
  }

  const columns: GridColDef[] = [
    {field: 'Id', headerName: 'Id'},
    {field: 'Name', headerName: 'Category', sortingOrder: ascendingSort, flex: 20},
    {field: 'ProductCount', headerName: 'Products', sortingOrder: ascendingSort, flex: 40},
    {field: 'x', headerName: '', sortingOrder: ascendingSort, flex: 20, renderCell: params => RenderCellButton(params.row)},
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

  function getRowId(row: Category) : number {
    return row.Id;
  }

  return (
    <Box sx={{width:'100%'}}>
      <DataGrid
        rows={categories}
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