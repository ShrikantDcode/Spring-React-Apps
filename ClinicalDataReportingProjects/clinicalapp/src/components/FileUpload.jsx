import React from "react";
import { InputText } from "primereact/inputtext";
import { importData } from "../Utils/importData";

const FileUpload = ({ label, createDataForChart, fileTypes, _style }) => {
  const handleFileUpload = async (e) => {
    if (!e.target.files) {
      return;
    }
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
      <InputText
        id="file1"
        type="file"
        accept={fileTypes}
        onChange={handleFileUpload}
        style={_style}
      />
    </>
  );
};

export default FileUpload;
