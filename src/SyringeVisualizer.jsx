import React from 'react';
import './SyringeVisualizer.css';

const SyringeVisualizer = ({ volumeMl }) => {
  // Assuming a 1mL syringe maximum for the visualizer.
  // We cap the visual fill at 100%.
  const maxVolume = 1.0; 
  const safeVolume = Math.max(0, parseFloat(volumeMl) || 0);
  const fillPercentage = Math.min((safeVolume / maxVolume) * 100, 100);
  const units = Math.round(safeVolume * 100);

  // Generate 10 tick marks (every 10 units up to 100)
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <div className="syringe-wrapper">
      <div className="syringe-container">
        
        <div className="syringe-needle"></div>
        
        <div className="syringe-barrel">
          
          {/* Dynamic Dosage Marker */}
          {fillPercentage > 0 && (
            <div 
              className="dose-marker"
              style={{ left: `${fillPercentage}%` }}
            >
              {safeVolume.toFixed(3)} mL
            </div>
          )}

          {/* The Liquid */}
          <div 
            className="syringe-liquid"
            style={{ width: `${fillPercentage}%` }}
          ></div>

          {/* The Plunger Rubber Tip */}
          <div 
            className="syringe-plunger-rubber"
            style={{ left: `calc(${fillPercentage}% - 5px)` }}
          ></div>

          {/* Tick Marks Overlay */}
          <div className="syringe-ticks">
            {ticks.map((tick) => (
              <div 
                key={tick} 
                className={`tick ${tick % 50 === 0 ? 'major' : ''}`}
                style={{ left: `${tick}%`, position: 'absolute' }}
              >
                {tick % 50 === 0 && tick > 0 && (
                  <div className="tick-label">{(tick / 100).toFixed(1)}</div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* The Plunger Stem sticking out the back */}
        <div 
          className="syringe-plunger-stem"
          style={{ 
            left: `${fillPercentage}%`,
            width: `calc(100% - ${fillPercentage}% + 50px)` 
          }}
        ></div>

        <div 
          className="syringe-thumb-rest"
          style={{
            left: `calc(100% + 50px)`
          }}
        ></div>

      </div>
    </div>
  );
};

export default SyringeVisualizer;
