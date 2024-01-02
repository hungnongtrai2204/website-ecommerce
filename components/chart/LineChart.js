import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  LineSeries,
} from "@syncfusion/ej2-react-charts";

const LineChart = ({}) => {
  const data = [
    { month: "Tháng 1", sales: 35 },
    { month: "Tháng 2", sales: 28 },
    { month: "Tháng 3", sales: 32 },
    { month: "Tháng 4", sales: 34 },
    { month: "Tháng 5", sales: 32 },
    { month: "Tháng 6", sales: 40 },
    { month: "Tháng 7", sales: 32 },
    { month: "Tháng 8", sales: 35 },
    { month: "Tháng 9", sales: 55 },
    { month: "Tháng 10", sales: 38 },
    { month: "Tháng 11", sales: 30 },
    { month: "Tháng 12", sales: 25 },
  ];
  const data2 = [
    { month: "Tháng 1", sales: 23 },
    { month: "Tháng 2", sales: 46 },
    { month: "Tháng 3", sales: 23 },
    { month: "Tháng 4", sales: 15 },
    { month: "Tháng 5", sales: 56 },
    { month: "Tháng 6", sales: 23 },
    { month: "Tháng 7", sales: 64 },
    { month: "Tháng 8", sales: 22 },
    { month: "Tháng 9", sales: 44 },
    { month: "Tháng 10", sales: 12 },
    { month: "Tháng 11", sales: 34 },
    { month: "Tháng 12", sales: 12 },
  ];
  const primaryxAxis = { valueType: "Category" };
  const tooltip = { enable: true };
  const marker = { visible: true, width: 10, height: 10 };

  return (
    <ChartComponent
      id="linecharts"
      primaryXAxis={primaryxAxis}
      width="650"
      height="350"
      tooltip={tooltip}
      title="Doanh Thu Bán Hàng"
    >
      <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName="month"
          yName="sales"
          width={2}
          name="2023"
          type="Line"
          marker={marker}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data2}
          xName="month"
          yName="sales"
          width={2}
          name="2024"
          type="Line"
          marker={marker}
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
