import React from "react";
import Header from "./Header";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import {
  lineCustomSeries,
  LinePrimaryYAxis,
  LinePrimaryXAxis,
} from "../../data/dummy";
const Line = () => {
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white rounded-3xl">
      <Header category="Chart" title="Inflation Rate" />
      <div className="w-full">
        <ChartComponent
          id="line-chart"
          height="420px"
          primaryXAxis={LinePrimaryXAxis}
          primaryYAxis={LinePrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background="#fff"
        >
          <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {lineCustomSeries.map((item, index) => (
              <SeriesDirective key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Line;
