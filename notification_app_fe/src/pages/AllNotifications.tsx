import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { fetchNotifications } from '../utils/api';
import type { Notification } from '../utils/api';
import { NotificationCard } from '../components/NotificationCard';
import { useViewedNotifications } from '../hooks/useViewedNotifications';
import { Log } from '../../../logging_middleware';

export const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState('All');
  
  const { viewedIds, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Log("frontend", "info", "page", `Loading All Notifications (Page: ${page}, Limit: ${limit}, Type: ${type})`);
      
      const data = await fetchNotifications(limit, page, type);
      setNotifications(data);
      setLoading(false);
    };

    loadData();
  }, [page, limit, type]);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
    setPage(1); 
    Log("frontend", "info", "component", `Changed notification filter to ${event.target.value}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          All Notifications
        </Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select 
            value={type} 
            onChange={handleTypeChange}
            displayEmpty
            sx={{ 
              borderRadius: 3, 
              bgcolor: '#FFFFFF', 
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.05)' } 
            }}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress size={32} thickness={4} />
        </Box>
      ) : (
        <Box>
          {notifications.map((notif) => (
            <NotificationCard 
              key={notif.ID} 
              notification={notif} 
              isViewed={viewedIds.has(notif.ID)}
              onView={markAsViewed}
            />
          ))}
          
          <Box display="flex" justifyContent="center" mt={6} mb={6}>
            <Pagination 
              count={10} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 500,
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
