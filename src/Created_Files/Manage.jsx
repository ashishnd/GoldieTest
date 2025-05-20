import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
const Reports = () => {
  const [rows, setRows] = useState([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedRowId, setSelectedRowId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5026/api/user/');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        const mappedData = data.map((item) => ({
          id: item.id,
          status: item.status,
          time: dayjs(item.time).format('YYYY-MM-DDTHH:mm:ss'),
          country: item.country,
        }));
        setRows(mappedData);
      } catch (err) {
        console.error('Error fetching reports:', err.message);
      }
    };
    fetchData();
  }, []);
  const handleOpenCalendar = (id) => {
    setSelectedRowId(id);
    setCalendarOpen(true);
  };
  const handleDateChange = async (newDate) => {
  const updatedTime = newDate.format('YYYY-MM-DDTHH:mm:ss');
  try {
    // Immediately update the UI with the new date (optimistic update)
    setSelectedDate(newDate);
    setCalendarOpen(false);
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedRowId ? { ...row, time: updatedTime } : row
      )
    );
    const response = await fetch(`http://localhost:5026/api/user/${selectedRowId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: updatedTime }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update time on server: ${response.statusText}`);
    }
    // Optionally, update rows again in case there is additional data returned or logic needed
  } catch (err) {
    console.error('Update failed:', err);
  }
};

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5026/api/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete record on server');
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };
  const columns = [
    { field: 'id', headerName: 'S.No', width: 90 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'time', headerName: 'Time', width: 180 },
    { field: 'country', headerName: 'Country', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Operations',
      width: 150,
      getActions: (params) => [
<GridActionsCellItem
          icon={<AccessTimeIcon />}
          label="Schedule"
          onClick={() => handleOpenCalendar(params.id)}
        />,
<GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          onClick={() => handleDelete(params.id)}
          showInMenu
        />,
      ],
    },
  ];
  return (
<LocalizationProvider dateAdapter={AdapterDayjs}>
<div style={{ height: 400, width: '100%', padding: '1rem' }}>
<Typography variant="h5" gutterBottom>
          Schedule Management
</Typography>
<DataGrid
          rows={rows}
          columns={columns}

          pageSize={5}
          rowsPerPageOptions={[5]}
        />
<Dialog open={calendarOpen} onClose={() => setCalendarOpen(false)}>
<DialogContent>
<DateTimePicker
              label="Pick Date & Time"
              value={selectedDate}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
</DialogContent>
</Dialog>
</div>
</LocalizationProvider>
  );
};
export default Reports;
