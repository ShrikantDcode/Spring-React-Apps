import React, { useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./Menu.css";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

const items = [
  { label: "Home", url: '/dashboard' },
  { label: "Calculators", url: '/analysecharts' },
  { label: "Quotes" },
  { label: "Diary" },
  { label: "Settings" },
];

const Menu = ({ profile }) => {
  const op = useRef(null);
  const [activeIndex, setActiveIndex] = useState(3);
  const navigate = useNavigate();
  const getAvatarLabel = (_profile) => {
    if (profile?.givenName && profile?.surname) {
      return (
        profile?.givenName?.[0]?.toUpperCase() +
        "" +
        profile?.surname?.[0]?.toUpperCase()
      );
    } else if (profile?.displayName) {
      let names = profile?.displayName?.split(" ");
      return (
        names?.[0]?.[0]?.toUpperCase() +
        "" +
        (names?.[1]?.[0]?.toUpperCase() || "")
      );
    } else {
      return "";
    }
  };

  return (
    <Container fluid className="mti-header">
      <header className="d-flex flex-wrap align-items-left">
        <div
          className="mti-logo"
          onClick={(e) => {
            navigate("/");
          }}
        >
          <a href="/">
            <img alt="Logo" src={"/trading-logo.png"} />
          </a>
        </div>
        {/* <div className="mti-menu h3"  onClick={(e)=>{navigate("/")}} > Learning Center</div> */}
        <TabMenu
          className="mti-tabmenu"
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => { 
            setActiveIndex(e.index); 
            navigate(items[e.index]?.url)}}
        />
        {!!!profile ? (
          <></>
        ) : (
          <>
            <Avatar
              label={getAvatarLabel(profile)}
              className="mr-2"
              size="small"
              shape="circle"
              style={{ margin: "auto" }}
              onClick={(e) => op.current.toggle(e)}
            />
            <OverlayPanel ref={op} id="overlay_panel" style={{ width: "15%" }}>
              <div>
                <h4 className="mb-0"> {profile?.displayName}</h4>
                <div className="mb-0"> {profile?.userPrincipalName}</div>
                <small> {profile?.jobTitle}</small>
                <div style={{ textAlign: "left" }} className="mt-2">
                  <Button
                    className="btn btn-sm btn-primary"
                    style={{ margin: "auto" }}
                    onClick={(e) => console.log("log out")}
                  >
                    {" "}
                    Logout
                  </Button>
                </div>
              </div>
            </OverlayPanel>
          </>
        )}

        {/* <Nav>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/about" className="nav-link px-2 link-secondary">
                About
              </Link>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            <Link to="/">
              <button type="button" className="btn btn-outline-primary me-2">
                Documentation
              </button>
            </Link>
          </div>
        </Nav> */}
      </header>
    </Container>
  );
};

export default Menu;
