// chartjs-gauge.d.ts
import { ChartTypeRegistry } from "chart.js";

declare module "chart.js" {
  interface ChartTypeRegistry {
    gauge: {
      chartOptions: {
        needle: {
          radiusPercentage: number;
          widthPercentage: number;
          lengthPercentage: number;
          color: string;
        };
        valueLabel: {
          display: boolean;
          formatter: (value: number) => string | number;
          fontSize: number;
          color: string;
        };
        circumference: number;
        rotation: number;
      };
      defaultDataPoint: number;
    };
  }
}
