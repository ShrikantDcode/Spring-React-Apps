import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { importData } from "../Utils/importData";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const FileUpload = ({ label, createDataForChart, fileTypes, _style, fileName, setFileName }) => {

  
  let showinputselection=useRef(null);
  const handleFileUpload = async (e) => {
    if (!e.target.files) {
      return;
    }
    setFileName(e.target.value)
    let parsedData = [];
    let fileType = e.target.files?.[0]?.name?.split(".")?.[1];
    if (fileType === "csv") {
      importData.csvFile(e.target.files, (results) => {
        parsedData = results.data;
      });
    } else if (fileType === "xlsx" || fileType === "xls") {
      let data = await importData.xlsxFile(e.target.files[0], 0);
      parsedData = data;
    }
    createDataForChart(parsedData);
  };
  return (
    <>
      <label htmlFor="file1">{label}</label>
      {/* <InputText
              id="uploadrun"
              type="file"
              ref={showinputselection}
              accept={'.csv'}
              onChange={handleFileImport}
              style={{ visibility: 'hidden', display: 'none' }}
      /> */}      
      {/* <InputText
        id="file1"
        type="file"
        accept={fileTypes}
        onChange={handleFileUpload}
        style={_style}
      /> */}
      <InputText
        ref={showinputselection}
        id="file1"
        type="file"
        accept={fileTypes}
        onChange={handleFileUpload}
        style={{ visibility: 'hidden', display: 'none' }}
      />
      <label htmlFor="name">Select file to upload</label>
      <Dropdown
        value={fileName}
        options={['P&L report', 'Tradebook']}
        //onChange={handleFileUpload}
        onChange={() => {
          showinputselection.current.value = null;
          //showinputselection.current.onChange();
          var event = new Event('change', { value: 'Tradebook' });
          showinputselection.current.dispatchEvent(event);
        }}
        placeholder="Select file"
        className="p-column-filter"
        showClear
        style={{ width: '20rem'}}
      />   
      <Button
        label="Import Users"
        className="p-button-sm"
        onClick={() => {
        showinputselection.current.value = null;
        showinputselection.current.click();
      }}
      />
    </>
  );
};

export default FileUpload;
