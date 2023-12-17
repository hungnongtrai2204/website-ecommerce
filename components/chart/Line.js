import React, { useEffect } from "react";
import Header from "./Header";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Category,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { LinePrimaryYAxis, LinePrimaryXAxis } from "../../data/dummy";
let total = 0;

const Line = ({ listCategories, orders, total }) => {
  // console.log(orders);
  const addTotalOfCategory = (id, qty) => {
    for (const category of listCategories) {
      let temp = 0;
      if (category.category._id === id) {
        category.qty += qty;
        break;
      }
    }
  };
  const percentOfCatogories = () => {
    let count = 0;
    for (const order of orders) {
      console.log(count);
      for (const product of order.products) {
        // total += product.qty;
        if (product.product.category === "653142d7e4363e03eb9e88a4") {
          // console.log(count, product);
        }
        addTotalOfCategory(product.product.category, product.qty);
      }
      count++;
    }
  };

  console.log(listCategories);
  console.log(total);

  const lineChartOldData = [
    [
      { x: "Tháng 1", y: 21 },
      { x: "Tháng 2", y: 24 },
      { x: "Tháng 3", y: 36 },
      { x: "Tháng 4", y: 38 },
      { x: "Tháng 5", y: 54 },
      { x: "Tháng 6", y: 57 },
      { x: "Tháng 7", y: 70 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 28 },
      { x: "Tháng 2", y: 44 },
      { x: "Tháng 3", y: 48 },
      { x: "Tháng 4", y: 50 },
      { x: "Tháng 5", y: 66 },
      { x: "Tháng 6", y: 78 },
      { x: "Tháng 7", y: 84 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
    [
      { x: "Tháng 1", y: 10 },
      { x: "Tháng 2", y: 20 },
      { x: "Tháng 3", y: 30 },
      { x: "Tháng 4", y: 39 },
      { x: "Tháng 5", y: 50 },
      { x: "Tháng 6", y: 70 },
      { x: "Tháng 7", y: 100 },
      { x: "Tháng 8", y: 70 },
      { x: "Tháng 9", y: 70 },
      { x: "Tháng 10", y: 70 },
      { x: "Tháng 11", y: 70 },
      { x: "Tháng 12", y: 70 },
    ],
  ];
  const lineChartData = listCategories.map((category, index) => {
    return category.month;
  });
  const lineCustomSeriesOld = [
    {
      dataSource: lineChartData[0],
      xName: "x",
      yName: "y",
      name: "Germany",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: lineChartData[1],
      xName: "x",
      yName: "y",
      name: "England",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: lineChartData[2],
      xName: "x",
      yName: "y",
      name: "India",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  ];
  const lineCustomSeries = listCategories.map((category, index) => {
    return {
      dataSource: lineChartData[index],
      xName: "x",
      yName: "y",
      name: category.category.name,
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    };
  });
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white rounded-3xl">
      <Header
        category="Danh Mục"
        title={`Doanh Số Từng Loại Danh Mục (Tổng Số Sản Phẩm Bán Được: ${total})`}
      />
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
          <Inject services={[LineSeries, Category, Legend, Tooltip]} />
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
