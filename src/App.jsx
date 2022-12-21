import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router';
// eslint-disable-next-line import/no-unresolved
import { Layout, message, Row, Spin } from "antd";
import "./App.less";
// import Dashboard from './Dashboard';
import CompleteList from "./pages/complete-list";
import Demo from "./Demo";
import LoginRoute from "./routes/LoginRoute";
import SignIn from "./pages/sign-in";
import NotFound from "./pages/not-found";
// import NotFound from "pages/not-found/index";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Content } from "antd/lib/layout/layout";
import { createContext } from "react";
import Messages from "./pages/messages";
import ProfileDetails from "./pages/profile-details/ProfileDetails";
import RegistrationForms from "./pages/registarion/RegistrationFroms";
import { getCategoryApi } from "./api/getCategories";
import AdminPanel from "./pages/admin-panel";
import MyProfile from "./pages/my-profile";
import TimeLine from "./pages/timeline";
import ShortListedProfiles from "./pages/shortlisted-profiles";
import { WarningOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import NavbarMain from "./components/navbar/NavbarMain";
import { useUpdateStateMutation } from "./api/getStatesQuery";
import JobApplications from "./pages/jobs/applications";
import Jobs from "./pages/jobs";
import MyApplications from "./pages/jobs/applications/MyApplications";
import MyJobs from "./pages/jobs/MyJobs";

message.config({
  top: 70,
  duration: 2,
});

export const FiltersContext = createContext({});

export const FilterProvider = FiltersContext.Provider;

const App = () => {
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState([]);
  const [token, setToken] = useState(false);
  const [category, setSelectedCategory] = useState(undefined);
  const [subCategory, setSubCategory] = useState(undefined);
  const history = useHistory();
  const location = useLocation(); // React Hook

  // loading
  const [isloading, setIsloading] = useState(false);
  const getCategories = async () => {
    const data = await getCategoryApi();

    // const updateData = data?.map((item) => ({
    //   ...item,
    //   id: item?._id,
    // }));
    setCategories(data);
  };


  // const getStates = async () => {
  //   const data = await getStatesApi();
  //   setStates(data);
  // };

  const setSubCategories = (id) => {
    const data = categories?.find((cat) => cat._id === id);
    setSelectedCategory(data?.value);
    setSelectedSubCategories(data?.childern);
    setTags(data?.tags);
    setFilters(data?.filters)
  };

  useEffect(() => {
    const isProfileCompleted = localStorage.getItem("isProfileCompleted");
    setProfileCompleted(isProfileCompleted);
  }, []);

  const { mutate: fetchStatesMutation } = useUpdateStateMutation();

  localStorage.setItem("loading", true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getCategories();
    // getStates();
    setToken(token);
    fetchStatesMutation();
      
  }, []);

  // useEffect(() => {
  //   setIsloading(true);
  //  setTimeout(() => {
  //   setIsloading(false);
    
  //  }, 3000);
  // }, [])
  const pathFilter = ['/register', '/signin', '/signin/']
  const renderTopNavbar = () => {
    if(pathFilter.includes(location.pathname)){
      return null
    }else {
      return <Navbar setIsloading={setIsloading} />
    }
  }

  const renderFooter = () => {
    if(pathFilter.includes(location.pathname)){
      return null
    }else {
      return <Footer />
    }
  }

  return (
    <Spin 
    spinning={false}
    >
      <Layout>
        <FilterProvider
          value={{
            categories,
            selectedSubCategories,
            setSubCategories,
            category,
            token,
            setToken,
            tags,
            filters,
            subCategory,
            setSubCategory,
            formData,
            setFormData
          }}
        >
         {renderTopNavbar()}
          <Content className={pathFilter.includes(location.pathname) ? '' : "layout-content"}>
         
            <Switch>
              <Route exact path="/" component={Demo} />
              <Route exact path="/signin" component={RegistrationForms} />
              <Route exact path="/signin/:callbackUrl" component={RegistrationForms} />
              <LoginRoute exact path="/my-profile" component={MyProfile} />
              <LoginRoute exact path="/user/profile/:Id" component={MyProfile} />
              <LoginRoute exact path="/user/create/profile" component={MyProfile} />
              
              <Route exact path="/timeline" component={TimeLine} />
              <LoginRoute exact path="/messages" component={Messages} />
              <LoginRoute
                exact
                path="/profile/:id"
                component={ProfileDetails}
              />
              <LoginRoute exact path="/admin" component={AdminPanel} />
              <LoginRoute exact path="/jobs" component={Jobs} />
              <LoginRoute exact path="/my/jobs" component={MyJobs} />
              <LoginRoute exact path="/job/applications" component={JobApplications} />
              <LoginRoute exact path="/my/job/applications" component={MyApplications} />
              <Route exact path="/register" component={RegistrationForms} />
              <Route exact path="/database" component={CompleteList} />
              <LoginRoute
                exact
                path="/shortlisted"
                component={ShortListedProfiles}
              />
              <Route path="*" component={NotFound} />
            </Switch>
            {!token ? null : !profileCompleted ? null : (
              <div
                style={{
                  position: "fixed",
                  bottom: 130,
                  right: 100,
                  backgroundColor: "orange",
                  padding: 24,
                }}
              >
                <Link to="/my-profile">
                  <WarningOutlined />
                  Please complete your profile.
                </Link>
              </div>
            )}
          </Content>
            {renderFooter()}
        </FilterProvider>
      </Layout>
      </Spin>
  );
};
export default App;
