import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

export interface User {
  name: string;
  email: string;
}

export interface FormData {
  industry: string;
  reportingYear: string;
  // Scope 1
  naturalGas: string; // therms
  diesel: string; // gallons
  refrigerantLeaks: string; // lbs of HFC-134a
  // Scope 2
  electricity: string; // kWh
  purchasedHeatSteam: string; // MMBtu
  // Scope 3
  purchasedGoods: string; // dollars spent
  capitalGoods: string; // dollars spent
  upstreamTransportation: string; // ton-miles
  downstreamTransportation: string; // ton-miles
  waste: string; // tons
  businessTravel: string; // passenger-miles
  employeeCommute: string; // passenger-miles
  endOfLifeTreatment: string; // tons of sold products
}

export interface EmissionResults {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

export interface AiTip {
    title: string;
    description: string;
}
