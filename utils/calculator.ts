import { FormData, EmissionResults } from '../types';

// Emission factors (example values, not for official use)
// Units are in lbs CO2e per unit of consumption
const EMISSION_FACTORS: { [key: string]: { [key: string]: number } } = {
  default: {
    naturalGas: 11.7, // per therm
    diesel: 22.4, // per gallon
    refrigerantLeaks: 1430, // per lb of HFC-134a
    electricity: 0.85, // per kWh
    purchasedHeatSteam: 136, // per MMBtu
    purchasedGoods: 0.2, // per dollar
    capitalGoods: 0.3, // per dollar
    upstreamTransportation: 0.35, // per ton-mile
    downstreamTransportation: 0.35, // per ton-mile
    waste: 1200, // per ton
    businessTravel: 0.5, // per passenger-mile
    employeeCommute: 0.4, // per passenger-mile
    endOfLifeTreatment: 50, // per ton
  },
  tech: {
    naturalGas: 11.7,
    diesel: 20.1,
    refrigerantLeaks: 1430,
    electricity: 0.75, // Often use more renewable energy
    purchasedHeatSteam: 120,
    purchasedGoods: 0.15, // Less manufacturing intensive
    capitalGoods: 0.4, // High value electronics
    upstreamTransportation: 0.3,
    downstreamTransportation: 0.3,
    waste: 1000,
    businessTravel: 0.6,
    employeeCommute: 0.45,
    endOfLifeTreatment: 100, // E-waste
  },
  manufacturing: {
    naturalGas: 12.5,
    diesel: 23.0,
    refrigerantLeaks: 1430,
    electricity: 0.95, // Higher energy use
    purchasedHeatSteam: 150,
    purchasedGoods: 0.4, // High material input
    capitalGoods: 0.35,
    upstreamTransportation: 0.5,
    downstreamTransportation: 0.5,
    waste: 1500,
    businessTravel: 0.4,
    employeeCommute: 0.38,
    endOfLifeTreatment: 40,
  },
  retail: {
    naturalGas: 11.5,
    diesel: 22.4,
    refrigerantLeaks: 1500, // High potential for leaks in refrigeration
    electricity: 0.90,
    purchasedHeatSteam: 130,
    purchasedGoods: 0.25,
    capitalGoods: 0.2,
    upstreamTransportation: 0.45, // Extensive logistics
    downstreamTransportation: 0.2, // Customer travel is separate
    waste: 1300,
    businessTravel: 0.45,
    employeeCommute: 0.42,
    endOfLifeTreatment: 30,
  },
};

const LBS_TO_METRIC_TONS = 0.000453592;

export const calculateFootprint = (data: FormData): EmissionResults => {
  const getNum = (val: string) => parseFloat(val) || 0;
  const factors = EMISSION_FACTORS[data.industry] || EMISSION_FACTORS.default;

  const scope1 =
    (getNum(data.naturalGas) * factors.naturalGas +
     getNum(data.diesel) * factors.diesel +
     getNum(data.refrigerantLeaks) * factors.refrigerantLeaks
    ) * LBS_TO_METRIC_TONS;

  const scope2 = 
    (getNum(data.electricity) * factors.electricity +
     getNum(data.purchasedHeatSteam) * factors.purchasedHeatSteam
    ) * LBS_TO_METRIC_TONS;

  const scope3 =
    (getNum(data.purchasedGoods) * factors.purchasedGoods +
     getNum(data.capitalGoods) * factors.capitalGoods +
     getNum(data.upstreamTransportation) * factors.upstreamTransportation +
     getNum(data.downstreamTransportation) * factors.downstreamTransportation +
     getNum(data.waste) * factors.waste +
     getNum(data.businessTravel) * factors.businessTravel +
     getNum(data.employeeCommute) * factors.employeeCommute +
     getNum(data.endOfLifeTreatment) * factors.endOfLifeTreatment
    ) * LBS_TO_METRIC_TONS;

  const total = scope1 + scope2 + scope3;

  return {
    scope1: parseFloat(scope1.toFixed(2)),
    scope2: parseFloat(scope2.toFixed(2)),
    scope3: parseFloat(scope3.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};
