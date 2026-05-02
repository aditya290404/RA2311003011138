import React from 'react';
import { Box, keyframes } from '@mui/material';

const float1 = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(15vw, -10vh) scale(1.1); }
  66% { transform: translate(-10vw, 15vh) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const float2 = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(-15vw, 15vh) scale(1.15); }
  66% { transform: translate(10vw, -10vh) scale(0.85); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const float3 = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(10vw, 15vh) scale(1.2); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

export const BackgroundAnimation: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#ffffff', // base background
      }}
    >
      {/* Container for blobs with heavy blur applied together */}
      <Box 
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          filter: 'blur(90px)',
          opacity: 0.7, // increased opacity for vividness
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
            animation: `${float1} 15s infinite ease-in-out`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '70vw',
            height: '70vw',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)',
            animation: `${float2} 18s infinite ease-in-out`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #AF52DE 0%, #FF2D55 100%)',
            animation: `${float3} 20s infinite ease-in-out reverse`,
          }}
        />
      </Box>
      
      {/* Light subtle noise overlay for premium feel */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.03,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
    </Box>
  );
};
