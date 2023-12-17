import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import {
  stackedCustomSeries,
  stackedPrimaryXAxis,
  stackedPrimaryYAxis,
} from "../../data/dummy";

const Stacked = ({ width, height, orders }) => {
  const getTotalOrderNotPaidOfMonth = (month) => {
    let total = 0;
    for (const order of orders) {
      if (
        new Date(order.createdAt).getMonth() + 1 == month &&
        order.isPaid === false &&
        order.status !== "Đã Hủy"
      ) {
        total += order.total;
      }
    }
    return total;
  };
  const getTotalOrderIsPaidOfMonth = (month) => {
    let total = 0;
    for (const order of orders) {
      if (
        new Date(order.createdAt).getMonth() + 1 == month &&
        order.isPaid === true &&
        order.status !== "Đã Hủy"
      ) {
        total += order.total;
      }
    }
    return total;
  };
  const stackedChartData = [
    [
      { x: "Tháng 1", y: getTotalOrderNotPaidOfMonth(1) },
      { x: "Tháng 2", y: getTotalOrderNotPaidOfMonth(2) },
      { x: "Tháng 3", y: getTotalOrderNotPaidOfMonth(3) },
      { x: "Tháng 4", y: getTotalOrderNotPaidOfMonth(4) },
      { x: "Tháng 5", y: getTotalOrderNotPaidOfMonth(5) },
      { x: "Tháng 6", y: getTotalOrderNotPaidOfMonth(6) },
      { x: "Tháng 7", y: getTotalOrderNotPaidOfMonth(7) },
      { x: "Tháng 8", y: getTotalOrderNotPaidOfMonth(8) },
      { x: "Tháng 9", y: getTotalOrderNotPaidOfMonth(9) },
      { x: "Tháng 10", y: getTotalOrderNotPaidOfMonth(10) },
      { x: "Tháng 11", y: getTotalOrderNotPaidOfMonth(11) },
      { x: "Tháng 12", y: getTotalOrderNotPaidOfMonth(12) },
    ],
    [
      { x: "Tháng 1", y: getTotalOrderIsPaidOfMonth(1) },
      { x: "Tháng 2", y: getTotalOrderIsPaidOfMonth(2) },
      { x: "Tháng 3", y: getTotalOrderIsPaidOfMonth(3) },
      { x: "Tháng 4", y: getTotalOrderIsPaidOfMonth(4) },
      { x: "Tháng 5", y: getTotalOrderIsPaidOfMonth(5) },
      { x: "Tháng 6", y: getTotalOrderIsPaidOfMonth(6) },
      { x: "Tháng 7", y: getTotalOrderIsPaidOfMonth(7) },
      { x: "Tháng 8", y: getTotalOrderIsPaidOfMonth(8) },
      { x: "Tháng 9", y: getTotalOrderIsPaidOfMonth(9) },
      { x: "Tháng 10", y: getTotalOrderIsPaidOfMonth(10) },
      { x: "Tháng 11", y: getTotalOrderIsPaidOfMonth(11) },
      { x: "Tháng 12", y: getTotalOrderIsPaidOfMonth(12) },
    ],
  ];
  const stackedCustomSeries = [
    {
      dataSource: stackedChartData[0],
      xName: "x",
      yName: "y",
      name: "Chưa Thanh Toán",
      type: "StackingColumn",
      background: "blue",
    },

    {
      dataSource: stackedChartData[1],
      xName: "x",
      yName: "y",
      name: "Đã Thanh Toán",
      type: "StackingColumn",
      background: "red",
    },
  ];
  return (
    <ChartComponent
      width={width}
      height={height}
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
