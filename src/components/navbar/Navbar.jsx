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
  Switch,
} from "antd";
import { useHistory, useLocation } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import "./Navbar.less";
import { FiltersContext } from "../../App";
import FormSelect from "../../common/inputs/FormSelect";
import { useUpdateUserNameMutation } from "../../api/user";
import MobileNavbar from "./MobileNavbar";
import { CloseCircleOutlined } from "@ant-design/icons";

const Navbar = ({setIsloading}) => {
  const history = useHistory();
  const location = useLocation(); // React Hook
  const [collapsed, setCollapsed] = useState(false);
 const getThemeType = localStorage.getItem('themeType')
 const defalutThemeType = getThemeType == 'dark' ? true : false
  const [themeType, setThemeType] = useState(defalutThemeType || false);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState('');
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const databasePath = location.pathname == '/database' 
  const userType  = localStorage.getItem("userType");
  const {
    categories,
    setSubCategories,
    token,
    setToken,
    formData,
    setFormData,
  } = useContext(FiltersContext);

  const handelLogout = () => {
    setToken(false);
    window.localStorage.clear();
    history.push("/");
  };

  const handleOnClick = (e) => {
    history.push(e.key);
    if (e.key == "/signOut") {
      handelLogout();
    }
    setCollapsed(false);
  };
  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();

  const handleThemeMode = (e) => {
    if(e){
      setThemeType(e);
      localStorage.setItem('themeType', 'dark');
    }else {
      setThemeType(e);
      localStorage.setItem('themeType', 'light');
    }
  }

  useEffect(() => {
    if(formData){
      setIsloading(isLoading);
    }
  }, [isLoading])

  useEffect(() => {
    if(themeType){
      document.documentElement.setAttribute("data-theme", 'dark');
    }else {
      document.documentElement.setAttribute("data-theme", 'light');
    }
  }, [themeType, getThemeType])
  

  useEffect(() => {
      const payload = formData;
      Object.keys(formData)?.forEach(key => {
        if(!formData[key])
          delete formData[key]
      });
      if(formData?.category || formData?.subCategory || formData?.tags && !databasePath) {
        history.push("/database");
      }
      userNameMutation(payload);
  }, [formData?.category, formData?.subCategory, formData?.tags])

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
        const payload = formData;
        Object.keys(formData).forEach(key => {
          if(!formData[key])
            delete formData[key]
        });
        if(formData?.fullName && !databasePath){
          history.push("/database");
        }
        userNameMutation(payload);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [formData?.fullName]);
  

  const userMenu = [
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
      label: (
        <div onClick={() => history.push("/my/jobs")}> My Jobs</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div onClick={() => history.push("/my/job/applications")}> My Applications</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <div onClick={() => handelLogout()}>Sign Out</div>,
    },
  ]

  const AdminMenu = [
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
      label: (
        <div onClick={() => history.push("/my/jobs")}> My Jobs</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div onClick={() => history.push("/my/job/applications")}> My Applications</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <div onClick={() => history.push("/admin")}>Admin</div>,
    },
    {
      type: "divider",
    },
    {
      key: "5",
      label: <div onClick={() => handelLogout()}>Sign Out</div>,
    },
  ]

  const menu = (
    <Menu
      items={userType == 'admin' ? AdminMenu : userMenu}
    />
  );

  const renderButtons = () => {
    if (token) {
      return (
        <React.Fragment>
          <Button type="primary" className={location.pathname ==  '/timeline' ? "active-navbar-btn" : '' } onClick={() => history.push("/timeline")}>
            Timeline
          </Button>
          <Button type="primary" className={location.pathname ==  '/jobs' ? "active-navbar-btn" : '' } onClick={() => history.push("/jobs")}>
            Jobs
          </Button>
          <Button
            type="primary"
            className={location.pathname ==  '/job/applications' ? "active-navbar-btn" : '' }
            onClick={() => history.push("/job/applications")}
          >
            Applications
          </Button>
          <Button className={location.pathname ==  '/database' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/database")}>
            Database
          </Button>
          {/* <Button type="primary" onClick={()=>history.push('/messages')}>Messages</Button> */}
          {/* <Button type="primary" onClick={()=>history.push('/my-profile')}>My Info</Button> */}
          <Button className={location.pathname ==  '/shortlisted' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/shortlisted")}>
            Shortlisted
          </Button>
          <Switch checked={themeType} onChange={handleThemeMode} checkedChildren="light" unCheckedChildren="dark" />
          {/* <Button type="primary" onClick={()=>history.push('/admin')}>Admin</Button> */}
          {/*<Button type="primary" onClick={handelLogout} ghost>Sign Out</Button> */}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button className={location.pathname ==  '/database' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/database")}>
            Database
          </Button>
          <Button className={location.pathname ==  '/register' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/register")}>
            Sign Up
          </Button>
          <Button className={location.pathname ==  '/signin' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/signin")}>
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
    <Layout.Header className="navbar">
      <Row className="navbar-ant-row" justify="space-around" align="middle">
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
                const getSubCategories = categories.find(
                  (item) => item._id == val.id
                );
                setSubCategoriesList(getSubCategories?.childern);
                setSubCategories(val.id);
                // HandlenewChnage()
                setFormData({
                  ...formData,
                  category: val.value,
                  subCategory: "",
                  tags: ''
                });
                setTags(getSubCategories?.tags)
              }}
              // onClear={() => {
              //   setFormData({ ...formData, category: "", subCategory: "" });
              //   setSubCategories("");
              //   setSubCategoriesList([])
              //   setTags([]);
              // }}
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
          <div className="tag-list">
          {tags?.map((tag) => (
            <div
              className={`nav-subBar ${tag.value == activeTag && "active-navbar-subBar"}`}
              onClick={() => {
                setFormData({...formData, tags: [tag.value]})
                setActiveTag(tag.value);
              }}
            >
              {tag.value}
            </div>
          ))}
          </div>
          {activeTag && <CloseCircleOutlined className="close-circle-outline" onClick={() => {
            setFormData({...formData, tags: []})
            setActiveTag('');
          }} />}
        </Row>
      ) : null}
    </Layout.Header>
  );
};

export default Navbar;
