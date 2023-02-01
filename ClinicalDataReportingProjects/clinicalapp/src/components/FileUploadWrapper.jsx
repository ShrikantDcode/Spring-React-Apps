import React from "react";
import FileUpload from "./FileUpload";
import { useState } from "react";

const FileUploadWrapper = ({
  label,
  fileTypes,
  _style,
  getDataSets
}) => {
  const [fileName, setFileName] = useState('');
  const createOptionspnlDataset = (_data, _chartColors, _chartColors2) => {
    console.log("label ",_data.map((data) => data.Symbol));
    console.log("dataSet ",[
      {
        label: "P&L",
        data: _data.map((data) => data["Realized P&L"]),
        backgroundColor: _chartColors,
        borderColor: "#61045F",
        borderWidth: 0,
      }
    ]);
    return {
      labels: _data.map((data) => data.Symbol),
      datasets: [
        {
          label: "P&L",
          data: _data.map((data) => data["Realized P&L"]),
          backgroundColor: _chartColors,
          borderColor: "#61045F",
          borderWidth: 0,
        }
      ],
    };
  };

  const createOptionspnlDataset_pie = (_data, _chartColors, _chartColors2) => {
    console.log("label ",_data.map((data) => data.Symbol));
    console.log("dataSet ",[
      {
         label: "Quantity",
         data: _data.map((data) => data["Quantity"]),
         backgroundColor: _chartColors2,
         borderColor: "#61045F",
         borderWidth: 0,
       }
     ]);
    return {
      labels: _data.map((data) => data.Symbol),
      datasets: [
       {
          label: "Quantity",
          data: _data.map((data) => data["Quantity"]),
          backgroundColor: _chartColors2,
          borderColor: "#61045F",
          borderWidth: 0,
        }
      ],
    };
  };

  const hhmmToDuration = (time) => {    
    let hh = time.split(':')?.[0];
    let mm = time.split(':')?.[1];
    let _time = Number((Number(hh) + Number(mm/60)).toFixed(2));    
  };

  const createTradebookDataset = (_data, _chartColors, _chartColors2) => {
    console.log("label ", [8,9, 10, 11, 12, 13, 14, 15]);
    
    let ordersCount = [];
    _data.forEach(trade => hhmmToDuration(trade["Order Execution Time"]));
    console.log("dataSet ",_data);
    return {
      labels: [8, 9, 10, 11, 12, 13, 14, 15],
      datasets: [
        {
          label: "Orders",
          data: _data.map((data) => hhmmToDuration(data["Order Execution Time"])),
          backgroundColor: _chartColors,
          borderColor: "#61045F",
          borderWidth: 0,
        }
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
        if(item.__EMPTY.includes('Tradebook for F&O')) {
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

        if(_excelSummary.statementTenure.includes('P&L Statement')) {
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
            )
          };
        } else {
          chartColors = [...chartColors, "#53b987"];
        return {
          [columns.__EMPTY]: item.__EMPTY, //.replace(/[0-9]?(D)?/g,''),
          [columns.__EMPTY_6]: item.__EMPTY_6,
          [columns.__EMPTY_8]: item.__EMPTY_8,
          [columns.__EMPTY_9]: item.__EMPTY_9,
          [columns?.__EMPTY_12]: item.__EMPTY_12 ? item?.__EMPTY_12.slice(item?.__EMPTY_12.indexOf('T')+1, item?.__EMPTY_12?.length) : '',
        };
       }
      });
      console.log("chartColors :", chartColors);
      let _chartData = {
        barChart: {
            //data: createOptionspnlDataset(finalList, chartColors, pointsColorSet)
            data: createTradebookDataset(finalList, chartColors, pointsColorSet)
        },
        pieChart: {
            //data: createOptionspnlDataset_pie(finalList, chartColors, pointsColorSet)
            data: createTradebookDataset(finalList, chartColors, pointsColorSet)
        }        
      };
    
      //setOptionspnlData(finalList);
      console.log("finalList ", finalList);
      let _dataTable = {
        columns: finalList?.[0] && Object.keys(finalList[0]),
        data: finalList
      }

      _excelSummary = {..._excelSummary, 
        ['Realized P&L']:  Math.round(_excelSummary?.['Realized P&L']),
        ['Charges']:  Math.round(_excelSummary?.['Charges']),
        finalIncome: Math.round(_excelSummary?.['Realized P&L'] - _excelSummary?.['Charges'])}
      getDataSets(_chartData, _dataTable, _excelSummary);
      //setColumns(finalList?.[0] && Object.keys(finalList[0]));
      //setTableData(finalList);
    }
  };

  return (
    <FileUpload
      label={label}
      createDataForChart={createDataForChart}
      fileName={fileName}
      setFileName={setFileName}
      fileTypes={fileTypes}
      _style={_style}
    />
  );
};

export default FileUploadWrapper;
