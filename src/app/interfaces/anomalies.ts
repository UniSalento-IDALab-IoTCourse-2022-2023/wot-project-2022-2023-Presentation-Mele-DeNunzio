import { RangeAnomalies } from "./range-anomalies";

export interface Anomalies {
  "description": string,
  "anomalies": RangeAnomalies[],
}
