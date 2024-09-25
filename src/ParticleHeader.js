import React, { useEffect } from 'react';

const ParticleHeader = () => {
  useEffect(() => {
    // Initialize FinisherHeader after the component renders
    new FinisherHeader({
      count: 10,
      size: { min: 1300, max: 1500, pulse: 0 },
      // ... (rest of your configuration)
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div> 
      {/* Add a container element if needed for positioning or styling the effect */}
    </div>
  );
};

export default ParticleHeader;