import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import { Chart } from "primereact/chart";
import FileUploadWrapper from "../../components/FileUploadWrapper";

const _data = [
  {
    Symbol: "BANKNIFTY22D0143400PE",
    Quantity: 100,
    "Buy Value": 6066.25,
    "Sell Value": 3630,
    "Realized P&L": -2436.25,
    Points: -24,
  },
  {
    Symbol: "BANKNIFTY22D0843000CE",
    Quantity: 100,
    "Buy Value": 32590,
    "Sell Value": 33608.75,
    "Realized P&L": 1018.75,
    Points: 10,
  },
  {
    Symbol: "BANKNIFTY22D0843100CE",
    Quantity: 25,
    "Buy Value": 3567.5,
    "Sell Value": 4350,
    "Realized P&L": 782.5,
    Points: 31,
  },
  {
    Symbol: "BANKNIFTY22D0843100PE",
    Quantity: 100,
    "Buy Value": 20368.75,
    "Sell Value": 13666.25,
    "Realized P&L": -6702.5,
    Points: -67,
  },
  {
    Symbol: "BANKNIFTY22D0843200PE",
    Quantity: 175,
    "Buy Value": 44767.5,
    "Sell Value": 38015,
    "Realized P&L": -6752.5,
    Points: -39,
  },
  {
    Symbol: "BANKNIFTY22D0843300PE",
    Quantity: 225,
    "Buy Value": 43315.0001,
    "Sell Value": 40920,
    "Realized P&L": -2395,
    Points: -11,
  },
  {
    Symbol: "BANKNIFTY22D0843500PE",
    Quantity: 150,
    "Buy Value": 20427.5,
    "Sell Value": 17900,
    "Realized P&L": -2527.5,
    Points: -17,
  },
  {
    Symbol: "BANKNIFTY22D1543700PE",
    Quantity: 225,
    "Buy Value": 47588.75,
    "Sell Value": 48806.25,
    "Realized P&L": 1217.5,
    Points: 5,
  },
  {
    Symbol: "BANKNIFTY22D1543800CE",
    Quantity: 25,
    "Buy Value": 6126.25,
    "Sell Value": 5975,
    "Realized P&L": -151.25,
    Points: -6,
  },
  {
    Symbol: "BANKNIFTY22D1543900PE",
    Quantity: 75,
    "Buy Value": 4558.75,
    "Sell Value": 5863.75,
    "Realized P&L": 1305,
    Points: 17,
  },
  {
    Symbol: "BANKNIFTY22D1544000PE",
    Quantity: 50,
    "Buy Value": 13672.5,
    "Sell Value": 13457.5,
    "Realized P&L": -215,
    Points: -4,
  },
  {
    Symbol: "BANKNIFTY22D1544100PE",
    Quantity: 175,
    "Buy Value": 25017.5,
    "Sell Value": 28105,
    "Realized P&L": 3087.5,
    Points: 18,
  },
  {
    Symbol: "BANKNIFTY22D2242500CE",
    Quantity: 75,
    "Buy Value": 13090,
    "Sell Value": 11840,
    "Realized P&L": -1250,
    Points: -17,
  },
  {
    Symbol: "BANKNIFTY22D2243000PE",
    Quantity: 25,
    "Buy Value": 8412.5,
    "Sell Value": 8650,
    "Realized P&L": 237.5,
    Points: 10,
  },
  {
    Symbol: "BANKNIFTY22D2243100CE",
    Quantity: 100,
    "Buy Value": 26298.75,
    "Sell Value": 25592.5,
    "Realized P&L": -706.25,
    Points: -7,
  },
  {
    Symbol: "BANKNIFTY22D2243200CE",
    Quantity: 125,
    "Buy Value": 36175,
    "Sell Value": 33180,
    "Realized P&L": -2995,
    Points: -24,
  },
  {
    Symbol: "BANKNIFTY22D2243200PE",
    Quantity: 50,
    "Buy Value": 11517.5,
    "Sell Value": 12400,
    "Realized P&L": 882.5,
    Points: 18,
  },
  {
    Symbol: "BANKNIFTY22D2243300CE",
    Quantity: 175,
    "Buy Value": 45755,
    "Sell Value": 47135,
    "Realized P&L": 1380,
    Points: 8,
  },
  {
    Symbol: "BANKNIFTY22D2243300PE",
    Quantity: 100,
    "Buy Value": 26707.5,
    "Sell Value": 27222.5,
    "Realized P&L": 515,
    Points: 5,
  },
  {
    Symbol: "BANKNIFTY22D2243400PE",
    Quantity: 75,
    "Buy Value": 23118.75,
    "Sell Value": 25462.5,
    "Realized P&L": 2343.75,
    Points: 31,
  },
  {
    Symbol: "BANKNIFTY22D2243500CE",
    Quantity: 125,
    "Buy Value": 23495,
    "Sell Value": 16203.75,
    "Realized P&L": -7291.25,
    Points: -58,
  },
  {
    Symbol: "BANKNIFTY2310542600PE",
    Quantity: 100,
    "Buy Value": 38915,
    "Sell Value": 34965,
    "Realized P&L": -3950,
    Points: -39,
  },
  {
    Symbol: "BANKNIFTY2310542900PE",
    Quantity: 125,
    "Buy Value": 50623.75,
    "Sell Value": 52800,
    "Realized P&L": 2176.25,
    Points: 17,
  },
  {
    Symbol: "BANKNIFTY2310543000PE",
    Quantity: 25,
    "Buy Value": 10475,
    "Sell Value": 11550,
    "Realized P&L": 1075,
    Points: 43,
  },
  {
    Symbol: "BANKNIFTY2310543200PE",
    Quantity: 150,
    "Buy Value": 52600.0001,
    "Sell Value": 54658.7501,
    "Realized P&L": 2058.75,
    Points: 14,
  },
];

const AnalyseCharts = () => {
  let toast = useRef(null);
  const navigate = useNavigate();
  const [showDataTable, setShowDataTable] = useState(false);
  const [chartDataset, setChartDataset] = useState({});
  const [tableDataset, setTableDataset] = useState({});
  const [chartType, setChartType] = useState("bar");
  console.log("chartDataset ", chartDataset);
  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const getChart = (type, _chartData) => {
    let component = <></>;
    if (type === "bar") {
      component = (
        <div style={{ width: 700 }}>
          <Chart type="bar" data={_chartData?.barChart?.data} />
        </div>
      );
    } else if (type === "pie") {
      component = (
        <div style={{ width: 400 }}>
          <Chart type="pie" data={_chartData?.pieChart?.data} />
        </div>
      );
    } else {
      component = (
        <div style={{ width: 700 }}>
          <Chart
            type="line"
            data={{
              ..._chartData?.barChart?.data,
              datasets: [
                {
                  ..._chartData?.barChart?.data?.datasets?.[0],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      );
    }
    return component;
  };

  const getDataSets = (_chartData, _dataTable) => {
    setChartDataset(_chartData);
    setTableDataset(_dataTable);
  };

  if (showDataTable) {
    return (
      <Dashboard
        _tableDataset={tableDataset}
        onClickChartsHandler={() => setShowDataTable(false)}
      />
    );
  } else {
    return (
      <div className="charts-container" style={{ marginTop: "0.7rem" }}>
        <Toast ref={toast} style={{ overflowWrap: "anywhere" }} />

        <div className="grid" style={{ marginTop: "0.7rem" }}>
          <div className="col-2"></div>
          <div className="col-2" style={{ textAlign: "right" }}>
            <FileUploadWrapper
              label="Import Data"
              fileTypes={[".csv", ".xlsx", ".xls"]}
              _style={{ marginLeft: "0.5rem", width: "15rem" }}
              getDataSets={getDataSets}
            />
          </div>
          <div className="col-2">
            <Button
              className="p-button p-button-warning"
              icon="pi pi-table"
              iconPos="right"
              label="Show Data"
              //className="p-button-primary mr-2 p-button-sm align-self-end"
              onClick={() => setShowDataTable(true)}
            />
          </div>

          <div className="col-6"></div>
        </div>
        <div className="grid" style={{ marginTop: "0.7rem" }}>
          <div className="col-2"></div>
          <div className="col-8">{getChart(chartType, chartDataset)}</div>
          <div className="col-2">
            {/* <div style={{ width: 400 }}>
              <Chart type="pie" data={optionspnlDataPie} />
            </div> */}
          </div>
        </div>
        <div className="grid" style={{ marginTop: "1rem" }}>
          <div className="col-2"></div>
          <div className="col-8">
            <Button
              label="Bar"
              icon="pi pi-chart-bar"
              className="p-button-primary mr-2 p-button-sm align-self-end"
              onClick={() => setChartType("bar")}
            />
            <Button
              label="Pie"
              icon="pi pi-chart-pie"
              className="p-button-sm"
              onClick={() => setChartType("pie")}
            />
            <Button
              label="Line"
              icon="pi pi-chart-line"
              className="p-button-sm"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => setChartType("line")}
            />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
};

export default AnalyseCharts;
