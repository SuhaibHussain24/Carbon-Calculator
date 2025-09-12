import React, { useState } from 'react';
import { FormData, EmissionResults } from '../types';
import { calculateFootprint } from '../utils/calculator';
import { ProgressBar } from './ProgressBar';

const initialFormData: FormData = {
    industry: '',
    reportingYear: new Date().getFullYear().toString(),
    // Scope 1
    naturalGas: '',
    diesel: '',
    refrigerantLeaks: '',
    // Scope 2
    electricity: '',
    purchasedHeatSteam: '',
    // Scope 3
    purchasedGoods: '',
    capitalGoods: '',
    upstreamTransportation: '',
    downstreamTransportation: '',
    waste: '',
    businessTravel: '',
    employeeCommute: '',
    endOfLifeTreatment: '',
};

const STEPS = ['industry', 'scope1', 'scope2', 'scope3'];

interface CalculatorProps {
    onCalculationComplete: (data: FormData, results: EmissionResults) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onCalculationComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
             setCurrentStep(prev => prev + 1);
        } else { // This is the 'Calculate' button click
             const calculatedResults = calculateFootprint(formData);
             onCalculationComplete(formData, calculatedResults);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const currentStepName = STEPS[currentStep];
    const totalSteps = STEPS.length;

    return (
        <div className="card" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
            <ProgressBar currentStep={currentStep + 1} totalSteps={totalSteps} stepName={currentStepName} />

            <div className="form-content">
                {currentStepName === 'industry' && (
                    <>
                        <h2 className="form-title">Company Information</h2>
                        <p className="form-subtitle">Let's start with some basic information about your company.</p>
                        <div className="form-group">
                            <label htmlFor="industry">Industry</label>
                            <select id="industry" name="industry" value={formData.industry} onChange={handleChange} required>
                                <option value="">Select your industry</option>
                                <option value="tech">Technology</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="retail">Retail</option>
                                <option value="default">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reportingYear">Reporting Year</label>
                            <input type="number" id="reportingYear" name="reportingYear" value={formData.reportingYear} onChange={handleChange} placeholder="e.g., 2024" required />
                        </div>
                    </>
                )}

                {currentStepName === 'scope1' && (
                    <>
                        <h2 className="form-title">Scope 1: Direct Emissions</h2>
                        <p className="form-subtitle">Enter data for emissions from sources your company owns or controls.</p>
                        <div className="form-group">
                            <label htmlFor="naturalGas">Natural Gas Consumption (therms/year)</label>
                            <input type="number" id="naturalGas" name="naturalGas" value={formData.naturalGas} onChange={handleChange} placeholder="e.g., 5000" min="0"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="diesel">Diesel Fuel in Company Vehicles (gallons/year)</label>
                            <input type="number" id="diesel" name="diesel" value={formData.diesel} onChange={handleChange} placeholder="e.g., 1200" min="0"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="refrigerantLeaks">Refrigerant Leaks (lbs of HFC-134a/year)</label>
                            <input type="number" id="refrigerantLeaks" name="refrigerantLeaks" value={formData.refrigerantLeaks} onChange={handleChange} placeholder="e.g., 50" min="0"/>
                        </div>
                    </>
                )}

                {currentStepName === 'scope2' && (
                    <>
                        <h2 className="form-title">Scope 2: Indirect Emissions</h2>
                        <p className="form-subtitle">Enter data for purchased energy.</p>
                        <div className="form-group">
                            <label htmlFor="electricity">Purchased Electricity (kWh/year)</label>
                            <input type="number" id="electricity" name="electricity" value={formData.electricity} onChange={handleChange} placeholder="e.g., 150000" min="0"/>
                        </div>
                         <div className="form-group">
                            <label htmlFor="purchasedHeatSteam">Purchased Heat or Steam (MMBtu/year)</label>
                            <input type="number" id="purchasedHeatSteam" name="purchasedHeatSteam" value={formData.purchasedHeatSteam} onChange={handleChange} placeholder="e.g., 200" min="0"/>
                        </div>
                    </>
                )}

                 {currentStepName === 'scope3' && (
                    <>
                        <h2 className="form-title">Scope 3: Value Chain Emissions</h2>
                        <p className="form-subtitle">Enter data for other indirect emissions in your value chain.</p>
                         <div className="form-group">
                            <label htmlFor="purchasedGoods">Purchased Goods & Services ($/year)</label>
                            <input type="number" id="purchasedGoods" name="purchasedGoods" value={formData.purchasedGoods} onChange={handleChange} placeholder="e.g., 500000" min="0"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="capitalGoods">Capital Goods ($/year)</label>
                            <input type="number" id="capitalGoods" name="capitalGoods" value={formData.capitalGoods} onChange={handleChange} placeholder="e.g., 100000" min="0"/>
                        </div>
                         <div className="form-group">
                            <label htmlFor="upstreamTransportation">Upstream Transportation (ton-miles/year)</label>
                            <input type="number" id="upstreamTransportation" name="upstreamTransportation" value={formData.upstreamTransportation} onChange={handleChange} placeholder="e.g., 25000" min="0"/>
                        </div>
                         <div className="form-group">
                            <label htmlFor="downstreamTransportation">Downstream Transportation (ton-miles/year)</label>
                            <input type="number" id="downstreamTransportation" name="downstreamTransportation" value={formData.downstreamTransportation} onChange={handleChange} placeholder="e.g., 40000" min="0"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="waste">Company Waste Generated (tons/year)</label>
                            <input type="number" id="waste" name="waste" value={formData.waste} onChange={handleChange} placeholder="e.g., 15" min="0"/>
                        </div>
                         <div className="form-group">
                            <label htmlFor="businessTravel">Business Travel (passenger-miles/year)</label>
                            <input type="number" id="businessTravel" name="businessTravel" value={formData.businessTravel} onChange={handleChange} placeholder="e.g., 100000" min="0"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeCommute">Employee Commuting (passenger-miles/year)</label>
                            <input type="number" id="employeeCommute" name="employeeCommute" value={formData.employeeCommute} onChange={handleChange} placeholder="e.g., 500000" min="0"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endOfLifeTreatment">End-of-Life Treatment of Sold Products (tons)</label>
                            <input type="number" id="endOfLifeTreatment" name="endOfLifeTreatment" value={formData.endOfLifeTreatment} onChange={handleChange} placeholder="e.g., 80" min="0"/>
                        </div>
                    </>
                )}
            </div>

            <div className="button-group form-navigation" style={{ marginTop: '2rem' }}>
                {currentStep > 0 ? (
                    <button onClick={handleBack} className="btn btn-secondary">Back</button>
                ): <div />}
                <button onClick={handleNext} className="btn btn-primary" disabled={currentStepName === 'industry' && !formData.industry}>
                    {currentStep === STEPS.length - 1 ? 'Calculate' : 'Next'}
                </button>
            </div>
        </div>
    );
};