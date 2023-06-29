import Papa from "papaparse";
import * as XLSX from "xlsx";

export const importData = {
  csvFile: (files, callback) => {
    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: "greedy",
      delimiter: ",",
      config: {
        // base config to use for each file
      },
      before: function (file, inputElem) {
        // executed before parsing each file begins;
        // what you return here controls the flow
      },
      error: function (err, file, inputElem, reason) {
        // executed if an error occurs while loading the file,
        // or if before callback aborted for some reason
      },
      complete: (results) => {
        callback(results);
      },
    });
  },
  xlsxFile: async (file, sheetNumber) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[sheetNumber];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  },
};
