export interface Coefficients {
  a: number;
  b: number;
  c: number;
}

export interface Solution {
  delta: number;
  x1: number | null;
  x2: number | null;
  message: string;
  hasRealRoots: boolean;
}

export enum CalculationStatus {
  IDLE = 'IDLE',
  SOLVED = 'SOLVED',
  ERROR = 'ERROR'
}

export interface GraphPoint {
  x: number;
  y: number;
}
