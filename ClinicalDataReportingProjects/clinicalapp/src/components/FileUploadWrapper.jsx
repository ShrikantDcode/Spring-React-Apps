import React from "react";
import FileUpload from "./FileUpload";

const FileUploadWrapper = ({
  label,
  fileTypes,
  _style,
  getDataSets
}) => {

  const createOptionspnlDataset = (_data, _chartColors, _chartColors2) => {
    return {
      labels: _data.map((data) => data.Symbol),
      datasets: [
        {
          label: "P&L",
          data: _data.map((data) => data["Realized P&L"]),
          backgroundColor: _chartColors,
          borderColor: "#61045F",
          borderWidth: 0,
        },
        {
          label: "Pointsx",
          data: _data.map((data) => data["Quantity"] * 10),
          backgroundColor: _chartColors2,
          borderColor: "#61045F",
          borderWidth: 0,
        },
      ],
    };
  };

  const createOptionspnlDataset_pie = (_data, _chartColors, _chartColors2) => {
    return {
      labels: _data.map((data) => data.Symbol),
      datasets: [
        {
          label: "P&L",
          data: _data.map((data) => data["Realized P&L"]),
          backgroundColor: _chartColors,
          borderColor: "#61045F",
          borderWidth: 0,
        },
        {
          label: "Pointsx",
          data: _data.map((data) => data["Quantity"]),
          backgroundColor: _chartColors2,
          borderColor: "#61045F",
          borderWidth: 0,
        },
      ],
    };
  };

  const createDataForChart = (parsedData) => {
    let finalList = [];
    let chartColors = [];
    let pointsColorSet = [];
    if (parsedData && parsedData.length) {
      let columns = {};
      let _excelSummary = {};
      //Extract rows from excel
      let tableRows = parsedData;
      parsedData.every((item, index) => {
        if (item.__EMPTY_1) {
          _excelSummary = { ..._excelSummary, [item.__EMPTY]: item.__EMPTY_1 };
        }
        if(item.__EMPTY.includes('P&L Statement')) {
          _excelSummary = { ..._excelSummary, statementTenure: item.__EMPTY };
        }
        if (item.__EMPTY === "Symbol") {
          columns = item;
          tableRows = tableRows.slice(index + 1, parsedData.length);
          return false;
        }
        return true;
      });
      console.log(tableRows);
      console.log(_excelSummary);
      console.log(columns);

      finalList = tableRows.map((item) => {
        if (item.__EMPTY_5 >= 0) {
          chartColors = [...chartColors, "#53b987"];
          pointsColorSet = [...pointsColorSet, "#d3d0d0"];
        } else {
          chartColors = [...chartColors, "#eb4d5c"];
          pointsColorSet = [...pointsColorSet, "#d3d0d0"];
        }
        return {
          [columns.__EMPTY]: item.__EMPTY, //.replace(/[0-9]?(D)?/g,''),
          [columns.__EMPTY_2]: item.__EMPTY_2,
          [columns.__EMPTY_3]: item.__EMPTY_3,
          [columns.__EMPTY_4]: item.__EMPTY_4,
          [columns.__EMPTY_5]: item.__EMPTY_5,
          Points: Math.round(
            item.__EMPTY_4 / item.__EMPTY_2 - item.__EMPTY_3 / item.__EMPTY_2
          ),
        };
      });
      console.log("chartColors :", chartColors);
      let _chartData = {
        barChart: {
            data: createOptionspnlDataset(finalList, chartColors, pointsColorSet)
        },
        pieChart: {
            data: createOptionspnlDataset_pie(finalList, chartColors, pointsColorSet)
        }        
      };
    
      //setOptionspnlData(finalList);
      console.log("finalList ", finalList);
      let _dataTable = {
        columns: finalList?.[0] && Object.keys(finalList[0]),
        data: finalList
      }
      getDataSets(_chartData, _dataTable, _excelSummary);
      //setColumns(finalList?.[0] && Object.keys(finalList[0]));
      //setTableData(finalList);
    }
  };

  return (
    <FileUpload
      label={label}
      createDataForChart={createDataForChart}
      fileTypes={fileTypes}
      _style={_style}
    />
  );
};

export default FileUploadWrapper;
