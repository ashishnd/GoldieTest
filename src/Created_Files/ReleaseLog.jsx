import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
        const res = await fetch('http://localhost:5283/api/AuditLog');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
            const mappedData = data.map(item => ({
      id:            item.id,
      userId:        item.userId,
      fileId:        item.fileId,
      releaseId:     item.releaseId,
      uploadedBy:    item.uploadedBy,
      uploadedTime:  dayjs(item.uploadedTime).format('dddd, Do MMMM YYYY, HH:mm'),
      modifiedBy:    item.modifiedBy,
      modifiedTime:  dayjs(item.modifiedTime).format('dddd, Do MMMM YYYY, HH:mm'),
      ip:            item.ip
      }));
      setRows(mappedData);
 
        // setRows(data);
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
  const updatedTime = moment().format('dddd, Do MMMM YYYY, HH:mm');
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
 /*
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
  };*/
  const columns = [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'userId', headerName: 'User Id', width: 150 },
    { field: 'fileId', headerName: 'File Id', width: 180 },
    { field: 'releaseId', headerName: 'Released Id', width: 150 },
    { field: 'uploadedBy', headerName: 'Uploaded By', width: 150 },
    { field: 'uploadedTime', headerName: 'Uploaded Time', width: 150 },
    { field: 'modifiedBy', headerName: 'Modified By', width: 150 },
    { field: 'modifiedTime', headerName: 'Modified Time', width: 150 },
     { field: 'ip', headerName: 'IP', width: 150 },
  /*  {
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
    */
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