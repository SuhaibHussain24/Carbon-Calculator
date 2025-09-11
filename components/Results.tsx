import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { EmissionResults, FormData, AiTip } from '../types';

interface ResultsProps {
    results: EmissionResults;
    formData: FormData;
    onStartNew: () => void;
}

const scopeColors = {
  scope1: 'var(--scope1-color)',
  scope2: 'var(--scope2-color)',
  scope3: 'var(--scope3-color)',
};

export const Results: React.FC<ResultsProps> = ({ results, formData, onStartNew }) => {
    const [aiTips, setAiTips] = useState<AiTip[]>([]);
    const [loadingTips, setLoadingTips] = useState(false);
    const [error, setError] = useState('');

    const { scope1, scope2, scope3, total } = results;
    const s1_percent = total > 0 ? (scope1 / total) * 100 : 0;
    const s2_percent = total > 0 ? (scope2 / total) * 100 : 0;
    
    const conicGradient = `conic-gradient(
        ${scopeColors.scope1} 0% ${s1_percent}%,
        ${scopeColors.scope2} ${s1_percent}% ${s1_percent + s2_percent}%,
        ${scopeColors.scope3} ${s1_percent + s2_percent}% 100%
    )`;

    const downloadReport = () => {
        let reportContent = `Carbon Footprint Report - ${formData.industry} (${formData.reportingYear})\n\n`;
        reportContent += `TOTAL EMISSIONS: ${total.toLocaleString()} metric tons of CO2e\n\n`;
        reportContent += `--- BREAKDOWN ---\n`;
        reportContent += `Scope 1 (Direct Emissions): ${scope1.toLocaleString()} tCO2e\n`;
        reportContent += `Scope 2 (Indirect Emissions): ${scope2.toLocaleString()} tCO2e\n`;
        reportContent += `Scope 3 (Value Chain Emissions): ${scope3.toLocaleString()} tCO2e\n\n`;
        reportContent += `--- INPUT DATA ---\n`;
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                reportContent += `${key}: ${value}\n`;
            }
        });

        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `CarbonReport_${formData.reportingYear}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const getAiTips = async () => {
        setLoadingTips(true);
        setError('');
        setAiTips([]);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `
                My company is in the ${formData.industry} industry.
                Our carbon footprint for ${formData.reportingYear} is ${total} metric tons of CO2e.
                The breakdown is:
                - Scope 1: ${scope1} tCO2e
                - Scope 2: ${scope2} tCO2e
                - Scope 3: ${scope3} tCO2e
                
                Based on this, provide 3 actionable, industry-specific recommendations to reduce our carbon footprint. For each recommendation, provide a "title" and a "description".
            `;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING }
                          }
                        }
                    }
                }
            });

            const parsedTips = JSON.parse(response.text);
            setAiTips(parsedTips);
        } catch (e: any) {
            console.error(e);
            setError('Could not fetch recommendations from AI. Please try again.');
        } finally {
            setLoadingTips(false);
        }
    };

    return (
        <div className="results-dashboard">
            <div className="results-header">
                <h1>Your Carbon Footprint Results</h1>
                <p>For reporting period: {formData.reportingYear}</p>
            </div>
            <div className="dashboard">
                <div className="card dashboard-card total-emissions">
                    <h3>Total Emissions</h3>
                    <p>{total.toLocaleString()} <span className="unit">tCO2e</span></p>
                    <span className="subtitle">Metric Tons of CO2 Equivalent</span>
                </div>
                <div className="card dashboard-card">
                     <h3>Emissions by Scope</h3>
                     <div className="chart-container">
                        <div className="pie-chart" style={{ background: conicGradient }}></div>
                        <ul className="legend">
                            <li>
                                <div className="legend-label">
                                    <span className="color-box" style={{backgroundColor: scopeColors.scope1}}></span> Scope 1
                                </div>
                                <span className="legend-value">{scope1.toLocaleString()} tCO2e</span>
                            </li>
                            <li>
                                <div className="legend-label">
                                    <span className="color-box" style={{backgroundColor: scopeColors.scope2}}></span> Scope 2
                                </div>
                                <span className="legend-value">{scope2.toLocaleString()} tCO2e</span>
                            </li>
                             <li>
                                <div className="legend-label">
                                    <span className="color-box" style={{backgroundColor: scopeColors.scope3}}></span> Scope 3
                                </div>
                                <span className="legend-value">{scope3.toLocaleString()} tCO2e</span>
                            </li>
                        </ul>
                     </div>
                </div>
            </div>
            
             <div className="card dashboard-card ai-tips">
                <h3>AI-Powered Reduction Tips</h3>
                <p>Get customized, actionable advice on how to reduce your company's carbon footprint.</p>
                <div className="button-group dashboard-actions">
                     <button onClick={getAiTips} className="btn btn-primary" disabled={loadingTips}>
                        {loadingTips ? 'Generating...' : 'Get AI Reduction Tips'}
                    </button>
                </div>
                {loadingTips && <div className="spinner-container"><div className="spinner"></div></div>}
                {error && <p className="error-message" style={{textAlign: 'center', marginTop: '1rem'}}>{error}</p>}
                {aiTips.length > 0 && (
                    <div className="tips-container">
                        {aiTips.map((tip, index) => (
                            <div key={index} className="tip-card">
                                <strong>{tip.title}</strong>
                                <p>{tip.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="button-group" style={{marginTop: '2rem', justifyContent: 'center', gap: '1rem'}}>
                <button onClick={downloadReport} className="btn btn-secondary">Download Report</button>
                <button onClick={onStartNew} className="btn btn-primary">Start New Calculation</button>
            </div>
        </div>
    );
};
