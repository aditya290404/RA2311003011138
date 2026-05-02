import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { fetchNotifications } from '../utils/api';
import type { Notification } from '../utils/api';
import { NotificationCard } from '../components/NotificationCard';
import { useViewedNotifications } from '../hooks/useViewedNotifications';
import { Log } from '../../../logging_middleware';

export const PriorityInbox: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const { viewedIds, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadPriority = async () => {
      setLoading(true);
      await Log("frontend", "info", "page", "Loading Priority Inbox");
      
      const data = await fetchNotifications();
      
      data.sort((a, b) => {
        const weight: Record<string, number> = { "Placement": 3, "Result": 2, "Event": 1 };
        const weightA = weight[a.Type] || 0;
        const weightB = weight[b.Type] || 0;
        
        if (weightA !== weightB) return weightB - weightA;
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      });

      setNotifications(data);
      setLoading(false);
    };

    loadPriority();
  }, []);

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    Log("frontend", "info", "component", `Changed priority limit to ${newLimit}`);
  };

  const topNotifications = notifications.slice(0, limit);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Priority Inbox
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select 
            value={limit} 
            onChange={handleLimitChange}
            displayEmpty
            sx={{ 
              borderRadius: 3, 
              bgcolor: '#FFFFFF', 
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.05)' } 
            }}
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress size={32} thickness={4} />
        </Box>
      ) : (
        <Box>
          {topNotifications.map((notif) => (
            <NotificationCard 
              key={notif.ID} 
              notification={notif} 
              isViewed={viewedIds.has(notif.ID)}
              onView={markAsViewed}
            />
          ))}
          
          {topNotifications.length === 0 && (
            <Box display="flex" justifyContent="center" mt={8}>
              <Typography sx={{ color: '#86868B', fontWeight: 500 }}>No priority notifications found.</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
