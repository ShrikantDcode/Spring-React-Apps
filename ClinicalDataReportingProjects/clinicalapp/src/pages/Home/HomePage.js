import { Button } from "primereact/button";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
const tiles = [
  // { name: 'Home', path: '/', icon: 'pi-home', authConfigKey: 'home' },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "pi-th-large",
    authConfigKey: "dashboard",
  },
  {
    name: "Analysw Charts",
    path: "/analysecharts",
    icon: "pi-chart-line",
    authConfigKey: "usageReports",
  },
  // { name: 'XYZ', path: '/paySettings', icon: 'pi-dollar', authConfigKey: 'paySettings' },
  // { name: 'Test', path: '/clientOnboarding', icon: 'pi-send', authConfigKey: 'clientOnboarding' },
];

const HomePage = () => {
  const navigate = useNavigate();
  // const {userRoles} = useContext(AppContext)
  const memoizedIsTileDisabled = useCallback((tile) => {
    //console.log(tile)
    const allowed = true; //checkAuth(allowedRoleMap.page[tile.authConfigKey], userRoles)
    return !allowed;
  }, []);
  return (
    <div className="flex flex-wrap align-items-center justify-content-start">
      {tiles.map((tile) => (
        <div className="tile">
          <Button
            className={`p-button-raised p-button-text tileBtn ${
              memoizedIsTileDisabled(tile) ? "shadow-none" : ""
            }`}
            onClick={() => {
              navigate(tile.path);
            }}
            disabled={memoizedIsTileDisabled(tile)}
          >
            <div
              className={`pi ${tile.icon} w-100 font-size-100 text-6xl`}
            ></div>
          </Button>
          <div
            className={`text-center font-bold mt-1 ${
              memoizedIsTileDisabled(tile) ? "text-500" : ""
            }`}
          >
            {tile.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
