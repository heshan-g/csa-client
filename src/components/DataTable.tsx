import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Shipment ID',
    width: 220,
    editable: false,
  },
  {
    field: 'senderName',
    headerName: 'Sender name',
    width: 150,
    editable: false,
  },
  {
    field: 'senderAddress',
    headerName: 'Sender Address',
    width: 250,
    editable: false,
  },
  {
    field: 'recipientName',
    headerName: 'Recipient name',
    width: 150,
    editable: false,
  },
  {
    field: 'recipientAddress',
    headerName: 'Recipient address',
    width: 250,
    editable: false,
  },
  {
    field: 'shipmentDescription',
    headerName: 'Shipment description',
    width: 250,
    editable: false,
  },
];

export default function DataTable({ data }: { data: any[] }) {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

