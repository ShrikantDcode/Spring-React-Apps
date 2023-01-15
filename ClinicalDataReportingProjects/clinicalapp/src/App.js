import React, { useState, useLayoutEffect, useRef } from "react";
//import "./App.css";
import { Routes, Route } from "react-router-dom";
import FindPatients from "./components/FindPatients";
import DisplayPatients from "./components/DisplayPatients";
import CollectClinicals from "./components/CollectClinicals";
import AddPatient from "./components/AddPatient";
import AnalyzeData from "./components/AnalyzeData";
import Home from "./components/Home";
import ChartGenerator from "./components/ChartGenerator";
import PageGuard from "./components/PageGuard";
import Layout from "./components/layout/Layout";
import { Container } from "react-bootstrap";
import { Toast } from "primereact/toast";
import Dashboard from "./pages/Dashboard/Dashboard";
import { allowedRoleMap } from "./config/authConfig";
import HomePage from "./pages/Home/HomePage";
import AnalyseCharts from "./pages/Analysis/AnalyseCharts";
import sagaBlue from "./theme-saga-blue.scss";
import AppContext from "./AppContext";

const _profile = {
  businessPhones: [],
  displayName: "Shrikant Dande",
  givenName: null,
  jobTitle: null,
  mail: "shrikant.dande@hitachivantara.com",
  mobilePhone: null,
  officeLocation: null,
  preferredLanguage: null,
  surname: null,
  userPrincipalName: "shrikant.dande_hitachivantara.com",
  id: "3c38730d",
};
const App = () => {
  const [selectedThemeModule, setSelectedThemeModule] = useState(sagaBlue);
  const [selectedState, setSelectedState] = useState(null);

  // useLayoutEffect(() => {
  //   selectedThemeModule.use();
  //   return () => { selectedThemeModule.unuse() };
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const changeTheme = (theme) => {
  //   import(`./${theme}.scss`).then((module) => {
  //     if (selectedThemeModule) {
  //       selectedThemeModule.unuse();
  //     }

  //     module.use();
  //     setSelectedThemeModule(module);
  //   });
  // }
  let toast = useRef(null);
  
  return (
    <>
      <AppContext.Provider value={{ pnlData: []}}>
        <Layout profile={_profile}>
          <Toast ref={toast} />
          {/* <button onClick={() => changeTheme('theme-saga-blue')} className="mr-3 cursor-pointer p-link">
          <img src="assets/images/themes/saga-blue.png" width="50" alt="saga-blue" /> 
        </button>*/}
          <Container fluid>
            <AppContext.Consumer>
              {() => (
                <>
                  <Routes>
                    <Route
                      path={allowedRoleMap.page.home.path}
                      element={
                        <PageGuard>
                          <HomePage />
                        </PageGuard>
                      }
                    />
                    <Route
                      path={allowedRoleMap.page.dashboard.path}
                      element={
                        <PageGuard>
                          <Dashboard />
                        </PageGuard>
                      }
                    />
                    <Route
                      path={allowedRoleMap.page.analyseCharts.path}
                      element={
                        <PageGuard>
                          <AnalyseCharts />
                        </PageGuard>
                      }
                    />
                    <Route
                      path="/findPatients"
                      element={
                        <PageGuard>
                          <FindPatients />
                        </PageGuard>
                      }
                    />
                    <Route
                      path="/displayPatients/:firstName/:lastName"
                      element={
                        <PageGuard>
                          <DisplayPatients />
                        </PageGuard>
                      }
                    />
                    <Route
                      path="/patientDetails/:patientId"
                      element={
                        <PageGuard>
                          <CollectClinicals />
                        </PageGuard>
                      }
                    />
                    <Route
                      path="/addPatient"
                      element={
                        <PageGuard>
                          <AddPatient />
                        </PageGuard>
                      }
                    />
                    <Route
                      path="/analyze/:patientId"
                      element={
                        <PageGuard>
                          <AnalyzeData />
                        </PageGuard>
                      }
                    />
                    <Route
                      path="/chart/:componentName/:patientId"
                      element={
                        <PageGuard>
                          <ChartGenerator />
                        </PageGuard>
                      }
                    />
                  </Routes>
                </>
              )}
            </AppContext.Consumer>
          </Container>
        </Layout>
      </AppContext.Provider>
    </>
  );
};

export default App;
