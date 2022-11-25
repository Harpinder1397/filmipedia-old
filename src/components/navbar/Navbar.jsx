import React, { useState, useContext, useEffect } from "react";
import {
  Layout,
  Row,
  Button,
  Input,
  Menu,
  Dropdown,
  Space,
  Avatar,
} from "antd";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import "./Navbar.less";
import { FiltersContext } from "../../App";
import FormSelect from "../../common/inputs/FormSelect";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUpdateUserNameMutation } from "../../api/user";
import { useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const {
    categories,
    setSubCategories,
    token,
    setToken,
    tags
  } = useContext(FiltersContext);

  const handelLogout = () => {
    setToken(false);
    window.localStorage.clear();
    history.push("/");
  };

  const handleOnClick = (e) => {
    console.log("click", e.key);
    history.push(e.key);
    if (e.key == "/signOut") {
      handelLogout();
    }
    setCollapsed(false);
  };

  const { mutate: userNameMutation } = useUpdateUserNameMutation();

  useEffect(() => {
    setLoading(true);
    const timeOutId = setTimeout(async () => {
      const payload = formData;
      userNameMutation(payload);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [formData]);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div onClick={() => history.push("/my-profile")}> My Info</div>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "2",
          label: <div onClick={() => history.push("/admin")}>Admin</div>,
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: <div onClick={() => handelLogout()}>Sign Out</div>,
        },
      ]}
    />
  );

  const renderButtons = () => {
    if (token) {
      return (
        <React.Fragment>
          <Button type="primary" onClick={() => history.push("/timeline")}>
            Timeline
          </Button>
          <Button type="primary" onClick={() => history.push("/jobs")}>
            Jobs
          </Button>
          <Button
            type="primary"
            onClick={() => history.push("/job/applications")}
          >
            Applications
          </Button>
          <Button type="primary" onClick={() => history.push("/database")}>
            Database
          </Button>
          {/* <Button type="primary" onClick={()=>history.push('/messages')}>Messages</Button> */}
          {/* <Button type="primary" onClick={()=>history.push('/my-profile')}>My Info</Button> */}
          <Button type="primary" onClick={() => history.push("/shortlisted")}>
            Shortlisted
          </Button>
          {/* <Button type="primary" onClick={()=>history.push('/admin')}>Admin</Button> */}
          {/*<Button type="primary" onClick={handelLogout} ghost>Sign Out</Button> */}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button type="primary" onClick={() => history.push("/database")}>
            Database
          </Button>
          <Button type="primary" onClick={() => history.push("/register")}>
            Sign Up
          </Button>
          <Button type="primary" onClick={() => history.push("/signin")}>
            Sign in
          </Button>
        </React.Fragment>
      );
    }
  };

  const renderProfileIcon = () => {
    if(token){
      return (
        <Dropdown
            overlay={menu}
            className="dropdown-hide-mobile-screen"
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
          <Space>
            <Avatar src="https://joeschmoe.io/api/v1/random" style={{height: '35px', width: '35px', border: '1px solid darkgrey'}}/>
          </Space>
        </Dropdown>
      )
    }
  }

  return (
    // <Spin spinning={loading}>
    <Layout.Header className="navbar">
      <Row justify="space-around" align="middle">
        <div className="ant-row ant-row-middle navbar__left">
          {/* <div className="navbar__logo" > */}
          {/* F I L M I P E D I A */}
          {/* W E B S I T E */}

          {/* </div> */}
          <div className="d-flex">
            <FormSelect
              allowClear={true}
              showSearch
              placeholder="Please select"
              className="navbar__category-selector"
              onSelect={(id, val) => {
                const getSubCategories = categories.filter(
                  (item) => item.id == val.id
                );
                setSubCategoriesList(getSubCategories[0].childern);
                setSubCategories(val.id);
                // HandlenewChnage()
                setLoading(true);
                setFormData({
                  ...formData,
                  category: val.value,
                  subCategory: "",
                });
              }}
              onClear={() => {
                setFormData({ ...formData, category: "", subCategory: "" });
                setSubCategories("");
              }}
              options={categories}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={formData?.category}
            />
            <FormSelect
              allowClear={true}
              showSearch
              placeholder="Please select"
              className="navbar__tag-selector"
              onSelect={(id, val) => {
                // selectedSubCategories(id);
                // setSubCategory(val.key)
                setFormData({ ...formData, subCategory: val.value });
              }}
              onClear={() => setFormData({ ...formData, subCategory: "" })}
              options={subCategoriesList}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // width={'50%'}
              value={formData?.subCategory}
            />
          </div>
        </div>

        <Input
          name="fullName"
          className="navbar-search-input"
          placeholder="Search"
          value={formData?.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <div className="navbar__right">{renderButtons()}</div>
        {renderProfileIcon()}
        <MobileNavbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            handleOnClick={handleOnClick}
          />
      </Row>
      {tags?.length ? (
        <Row className="navbar__tags-container">
          {tags?.map((tag) => (
            <div className="nav-subBar">{tag.value}</div>
          ))}
        </Row>
      ) : null}
    </Layout.Header>
    // </Spin>
  );
};

export default Navbar;
