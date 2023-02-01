import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { FilterMatchMode } from "primereact/api";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import "./../pages.scss";
import FileUploadWrapper from "../../components/FileUploadWrapper";

const Dashboard = ({ _excelSummary, _tableDataset, onClickChartsHandler }) => {
  const [users, setUsers] = useState();
  const [editingRows, setEditingRows] = useState({});
  const [changedRows, setChangedRows] = useState({});
  const [addedRows, setAddedRows] = useState({});
  const [editedUsers, setEditedUsers] = useState();
  const [tableDataset, setTableDataset] = useState({});
  const [excelSummary, setExcelSummary] = useState({});
  const [summary, setSummary] = useState({
    highestPnl: 0,
    lowestPnl: 0,
    highestPoints: 0,
    highestQuantity: 0,
    highestValues: [0],
    wins: 0,
    fails: 0,
  });
 
  const navigate = useNavigate();
  let toast = useRef(null);
  const autoUpdateMessage = useRef(null);

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/clinicalservices/api/patients")
    //   .then((res) => {
    //     const patientData = res.data;
    //     console.log(JSON.stringify([patientData[0], patientData[1]]));
    //     setVisibleUsers([patientData[0], patientData[1]]);
    //   });
    // console.log("tableData>> ",tableData);
    setTableDataset(_tableDataset);
    setExcelSummary(_excelSummary);
  }, []);

  useEffect(() => {
    setSummary(getSummary(tableDataset?.data));
  }, [tableDataset?.data]);

  const getSummary = (tableData) => {
    let _summary;
    if (tableData) {
      let _highestPoints = tableData.sort((a, b) => b.Points - a.Points)?.[0]
        ?.Points;
      let _highestPnl = tableData.sort((a, b) => b["Realized P&L"] - a["Realized P&L"])?.[0]?.["Realized P&L"];
      let _lowestPnl = tableData.sort((a, b) => a["Realized P&L"] - b["Realized P&L"])?.[0]?.["Realized P&L"];
      let _highestQuantity = tableData.sort((a, b) => b.Quantity - a.Quantity)?.[0]?.Quantity;
      let wins = 0;
      let fails = 0;
      tableData.forEach(item => {
        if (item["Realized P&L"] > 0) {
          wins = wins + 1;
        } else {
          fails = fails + 1;
        }
      });

      _summary = {
        highestPnl: _highestPnl,
        lowestPnl: _lowestPnl,
        highestPoints: _highestPoints,
        highestQuantity: _highestQuantity,
        highestValues: [_highestPnl, _highestPoints, _highestQuantity],
        wins: wins,
        fails: fails
      };
    }
    return _summary;
  };
  const onUserRowEditCancel = (e) => {};

  const onUserRowEditInit = (e) => {
    console.log("onUserRowEditInit ", JSON.stringify(e.data));
    setEditedUsers({ ...editedUsers, [e.index]: e.data });
  };

  const onUserRowEditChange = (e) => {
    setEditingRows(e.data);
  };

  const onUserRowEditComplete = (e) => {
    console.log("onUserRowEditComplete ", e);
    let { data, newData } = e;
    if (JSON.stringify(data) !== JSON.stringify(newData)) {
      const _users = JSON.parse(JSON.stringify(users));
      const ogIndex = data.ogIndex;
      newData.displayName = `${newData.firstName} ${newData.lastName}`;
      _users[ogIndex] = {
        ...newData,
        changed: true,
        action: "update",
        ogData: _users[ogIndex].ogData || data,
      };
      setUsers([..._users]);
      if (!data.newUser) {
        const _changedRows = changedRows;
        _changedRows[data.sAMAccountName] = newData;
        setChangedRows({ ..._changedRows });
      } else {
        const _addedRows = addedRows;
        _addedRows[data.ogIndex] = newData;
        setAddedRows({ ..._addedRows });
      }
    }
  };

  const onUserRowEditSave = (e) => {};

  const getRowClassName = (e) => {
    if (e?.changed) {
      return "changed";
    }
  };

  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };
  const clearFilter1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getDataSets = (_chartData, _dataTable, _excelSummary) => {
    //setChartDataset(_chartData);
    setTableDataset(_dataTable);
    setExcelSummary(_excelSummary);
  };

  const renderHeader1 = () => {
    return (
      <div>
        <div className="grid">
          <div className="col-8">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label=""
              className="p-button-outlined mr-1"
              onClick={clearFilter1}
            />
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={globalFilterValue1}
                onChange={onGlobalFilterChange1}
                placeholder="Search Users"
              />
            </span>
          </div>
          <div className="col-4" style={{ textAlign: "right" }}>
            <FileUploadWrapper
              label="Import Data"
              fileTypes={[".csv", ".xlsx", ".xls"]}
              _style={{ marginLeft: "0.5rem", width: "15rem" }}
              getDataSets={getDataSets}
            />
          </div>
        </div>
      </div>
    );
  };
  const header1 = renderHeader1();

  const toolbarInfoTemplate = (
    <>
      <div>
        <h5>{`${excelSummary?.statementTenure || ''}`}</h5>
        <div className="mt-3">
          <Message
            severity="info"
            className="mr-2 font-bold"
            content={`Highest Points : ${summary?.highestPoints || 0}`}
          />
          <Message
            severity="success"
            className="mr-2 font-bold"
            content={`Highest Profit : ${summary?.highestPnl || 0}`}
          />
          <Message
            severity="error"
            className="mr-2 font-bold"
            content={`Highest Loss : ${summary?.lowestPnl || 0}`}
          />
          <Message
            severity="info"
            className="mr-2 font-bold"
            content={`Highest Quantity : ${summary?.highestQuantity || 0}`}
          />
          <Message
            severity="success"
            className="mr-2 font-bold"
            content={`Wins : ${summary?.wins || 0}`}
          />
          <Message
            severity="error"
            className="mr-2 font-bold"
            content={`Fails : ${summary?.fails || 0}`}
          />
          <Message
            severity="error"
            className="mr-2 font-bold"
            content={`Brokerage & Charges : ${-1*Number(excelSummary?.['Charges']) || 0}`}
          />          
          <Message
            severity="info"
            className="mr-2 font-bold"
            content={`Realized P&L : ${excelSummary?.['Realized P&L'] || 0}`}
          />
          <Message
            severity="info"
            className="mr-2 font-bold"
            content={`Final Income : ${excelSummary?.['finalIncome'] || 0}`}
          />
          <Button
            className="p-button p-button-warning"
            icon="pi pi-chart-bar"
            iconPos="right"
            label="Show Chart"
            onClick={onClickChartsHandler}
          />
        </div>
      </div>
    </>
  );

  const bodyTemplate = (rowData, field) => {
    return (
      <div
        className={`${field === "Realized P&L" ? (rowData?.[field] > 0 ? "highlighted-green": "highlighted-red") : '' }`}>
        {rowData?.[field]}
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} style={{ overflowWrap: "anywhere" }} />
      <Messages ref={autoUpdateMessage} />
      <div style={{ minHeight: "6rem" }}>
        <Toolbar left={toolbarInfoTemplate} className="mb-3" />
      </div>
      <DataTable
        header={header1}
        filters={filters1}
        value={tableDataset?.data}
        sortField={"Points"}
        sortOrder={-1}
        filterDisplay="row"
        showGridlines
        responsiveLayout="stack"
        stripedRows
        size="small"
        editMode="row"
        scrollable
        scrollHeight="39em"
        editingRows={editingRows}
        onRowEditCancel={onUserRowEditCancel}
        onRowEditSave={onUserRowEditSave}
        onRowEditComplete={onUserRowEditComplete}
        onRowEditInit={onUserRowEditInit}
        onRowEditChange={onUserRowEditChange}
        rowClassName={getRowClassName}
        dataKey={"id"}
        style={{ border: "0.5px solid lightgray" }}>
        {tableDataset?.columns?.length &&
          tableDataset?.columns.map((column) => (
            <Column
              sortable
              field={column}
              header={column}
              style={{ overflowWrap: "anywhere" }}
              body={(row) => bodyTemplate(row, column)}></Column>
          ))}
      </DataTable>
    </>
  );
};
export default Dashboard;
