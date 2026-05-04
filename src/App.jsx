import React, { useState, useEffect } from 'react';
import { Syringe, Droplets, Info, Beaker, CheckCircle2 } from 'lucide-react';
import './index.css';

function App() {
  const [vialMg, setVialMg] = useState('5');
  const [waterMl, setWaterMl] = useState('2');
  const [doseMg, setDoseMg] = useState('0.25');
  
  const [resultMl, setResultMl] = useState('0');
  const [resultUnits, setResultUnits] = useState('0');

  useEffect(() => {
    const mg = parseFloat(vialMg);
    const water = parseFloat(waterMl);
    const dose = parseFloat(doseMg);

    if (mg > 0 && water > 0 && dose > 0) {
      // Concentration = mg / water (e.g. 5mg / 2mL = 2.5mg/mL)
      const concentration = mg / water;
      
      // Volume to inject = dose / concentration
      const volumeMl = dose / concentration;
      
      // 100 U/mL syringe assumption
      const units = volumeMl * 100;

      setResultMl(volumeMl.toFixed(3));
      setResultUnits(Math.round(units).toString());
    } else {
      setResultMl('0.000');
      setResultUnits('0');
    }
  }, [vialMg, waterMl, doseMg]);

  return (
    <div className="app-container">
      <header>
        <h1>Peptide Calculator</h1>
        <p className="subtitle">Precision Reconstitution & Dosage Tracking</p>
      </header>

      <div className="glass-panel">
        <div className="grid-2">
          
          <div className="calculator-inputs">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Beaker size={20} className="icon-wrapper" style={{margin:0}} /> 
              Vial Setup
            </h3>
            
            <div className="input-group">
              <label>Peptide Vial Quantity (mg)</label>
              <div className="input-wrapper">
                <input 
                  type="number" 
                  value={vialMg} 
                  onChange={(e) => setVialMg(e.target.value)}
                  step="0.1"
                  min="0"
                />
                <span className="input-unit">mg</span>
              </div>
            </div>

            <div className="input-group">
              <label>Bacteriostatic Water Added (mL)</label>
              <div className="input-wrapper">
                <input 
                  type="number" 
                  value={waterMl} 
                  onChange={(e) => setWaterMl(e.target.value)}
                  step="0.5"
                  min="0"
                />
                <span className="input-unit">mL</span>
              </div>
            </div>

            <div className="divider" style={{margin: '1.5rem 0'}}></div>

            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Syringe size={20} className="icon-wrapper" style={{margin:0}} /> 
              Desired Dosage
            </h3>

            <div className="input-group">
              <label>Dose Amount (mg)</label>
              <div className="input-wrapper">
                <input 
                  type="number" 
                  value={doseMg} 
                  onChange={(e) => setDoseMg(e.target.value)}
                  step="0.05"
                  min="0"
                />
                <span className="input-unit">mg</span>
              </div>
            </div>
          </div>

          <div className="calculator-results">
            <div className="result-card">
              <div className="result-label">Volume to Inject</div>
              <div className="result-value">{resultMl}</div>
              <div className="result-subtext">milliliters (mL)</div>
              
              <div className="result-units">
                ~{resultUnits} IU (Units on U-100 Syringe)
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="guide-section">
        <h2>Reconstitution Guide</h2>
        <div className="steps-grid">
          
          <div className="step-card">
            <Droplets size={28} className="icon-wrapper" />
            <div className="step-number">1</div>
            <h3>Preparation</h3>
            <p>Swab the stoppers of both the peptide vial and the bacteriostatic water with alcohol pads. Let them air dry.</p>
          </div>

          <div className="step-card">
            <Syringe size={28} className="icon-wrapper" />
            <div className="step-number">2</div>
            <h3>Draw Water</h3>
            <p>Use a larger syringe (e.g., 3mL) to draw the calculated amount of bacteriostatic water (e.g., {waterMl}mL).</p>
          </div>

          <div className="step-card">
            <Beaker size={28} className="icon-wrapper" />
            <div className="step-number">3</div>
            <h3>Reconstitute</h3>
            <p>Slowly inject the water down the inner side of the peptide vial. Do not spray directly onto the powder.</p>
          </div>

          <div className="step-card">
            <CheckCircle2 size={28} className="icon-wrapper" />
            <div className="step-number">4</div>
            <h3>Mix Gently</h3>
            <p>Roll the vial gently between your palms to dissolve. <strong>Do not shake.</strong> Store in the refrigerator.</p>
          </div>

        </div>
      </div>

      <div className="disclaimer">
        <Info size={20} style={{marginBottom: '0.5rem'}} />
        <p><span>Disclaimer:</span> This calculator is for educational and informational purposes only. It is not intended to provide medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional before administering any substances.</p>
      </div>

    </div>
  );
}

export default App;
