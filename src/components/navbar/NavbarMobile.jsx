import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { FiltersContext } from "../../App";
import React, { useContext, useState } from "react";
import "./NavbarMabileStyle.less";
import { Link } from "react-router-dom";

const NavbarMobile = () => {
  const {
    categories,
    setSubCategories,
    selectedSubCategories,
    category,
    token,
    setToken,
    tags,
    subCategory,
    setSubCategory,
  } = useContext(FiltersContext);
  const [checkicon, setCheckicon] = useState(true);

  const handelLogout = () => {
    setToken(false);
    window.localStorage.clear();
    history.push("/");
  };
  return (
    <div class="Navbar-mobile">
      <input type="checkbox" id="nav-check" />

      <label for="nav-check">
        {checkicon ? (
          <MenuOutlined
            style={{ color: "white", fontSize: "20px" }}
            onClick={() => setCheckicon(false)}
          />
        ) : (
          <CloseOutlined
            style={{ color: "white", fontSize: "20px" }}
            onClick={() => setCheckicon(true)}
          />
        )}
      </label>
      <div class="nav-links">
        {token ? (
          <>
            <Link to={"/timeline"}>Timeline</Link>{" "}
            <Link to={"/jobs"}>Jobs</Link>{" "}
            <Link to={"/database"}>Database</Link>{" "}
            <Link to={"/my-profile"}>My Info</Link>{" "}
            <Link to={"/shortlisted"}>Shortlisted</Link>{" "}
            <Link to={"/admin"}>Admin</Link>{" "}
            <Link to={""} onClick={handelLogout}>
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link to={"/database"}>Database</Link>
            <Link to={"/register"}>Sign Up</Link>
            <Link to={"/signin"}>Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;
