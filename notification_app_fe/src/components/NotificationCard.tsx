import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import type { Notification } from '../utils/api';

interface NotificationCardProps {
  notification: Notification;
  isViewed: boolean;
  onView: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, isViewed, onView }) => {
  const getIcon = () => {
    switch (notification.Type) {
      case 'Placement': return <BusinessCenterIcon fontSize="small" sx={{ color: '#007AFF' }} />;
      case 'Result': return <AssignmentTurnedInIcon fontSize="small" sx={{ color: '#FF3B30' }} />;
      case 'Event': return <EventIcon fontSize="small" sx={{ color: '#86868B' }} />;
      default: return <EventIcon fontSize="small" sx={{ color: '#86868B' }} />;
    }
  };

  const getBadgeStyle = () => {
    switch (notification.Type) {
      case 'Placement': return { bgcolor: 'rgba(0,122,255,0.1)', color: '#007AFF' };
      case 'Result': return { bgcolor: 'rgba(255,59,48,0.1)', color: '#FF3B30' };
      case 'Event': return { bgcolor: 'rgba(142,142,147,0.1)', color: '#8E8E93' };
      default: return { bgcolor: 'rgba(142,142,147,0.1)', color: '#8E8E93' };
    }
  };

  const timeString = new Date(notification.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = new Date(notification.Timestamp).toLocaleDateString();

  return (
    <Card 
      onClick={() => onView(notification.ID)}
      elevation={0}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        bgcolor: isViewed ? '#FFFFFF' : '#F4F9FF',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        border: '1px solid',
        borderColor: isViewed ? 'rgba(0,0,0,0.05)' : 'rgba(0,122,255,0.1)',
        '&:hover': {
          transform: 'scale(1.01) translateY(-2px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
        }
      }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Box display="flex" alignItems="flex-start">
          <Box sx={{ width: 12, display: 'flex', alignItems: 'center', pt: 0.5 }}>
            {!isViewed && (
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#007AFF' }} />
            )}
          </Box>
          
          <Box flexGrow={1} ml={1}>
            <Box display="flex" alignItems="center" mb={0.5}>
              <Box display="flex" alignItems="center" mr={1.5} sx={{ opacity: isViewed ? 0.7 : 1 }}>
                {getIcon()}
              </Box>
              <Typography variant="body1" component="span" sx={{ 
                fontWeight: isViewed ? 500 : 600, 
                color: '#1D1D1F',
                flexGrow: 1
              }}>
                {notification.Message}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" mt={1}>
              <Chip 
                size="small" 
                label={notification.Type} 
                sx={{ 
                  height: 24, 
                  fontSize: '0.75rem', 
                  fontWeight: 600,
                  border: 'none',
                  ...getBadgeStyle()
                }} 
              />
              <Typography variant="body2" sx={{ ml: 2, color: '#86868B', fontSize: '0.8rem' }}>
                {dateString} at {timeString}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
