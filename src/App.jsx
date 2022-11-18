// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       hello
//     </div>
//   )
// }

// export default App

import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { Layout, message, Row, Spin } from "antd";
import "./App.less";
// import Dashboard from './Dashboard';
import CompleteList from "./pages/complete-list";
import Demo from "./Demo";
import LoginRoute from "./routes/LoginRoute";
import SignIn from "./pages/sign-in";
import NotFound from "./pages/not-found";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Content } from "antd/lib/layout/layout";

import { createContext } from "react";
import Messages from "./pages/messages";
import ProfileDetails from "./pages/profile-details/ProfileDetails";

import RegistrationForms from "./pages/registarion/RegistrationFroms";
import { getCategoryApi } from "./api/getCategories";
import { getStatesApi } from "./api/getStates";
import AdminPanel from "./pages/admin-panel";
import MyProfile from "./pages/my-profile";
import TimeLine from "./pages/timeline";
import ShortListedProfiles from "./pages/shortlisted-profiles";
import { WarningOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import NavbarMain from "./components/navbar/NavbarMain";

message.config({
  top: 70,
  duration: 2,
});

export const FiltersContext = createContext({});

export const FilterProvider = FiltersContext.Provider;

const App = () => {
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [token, setToken] = useState(false);
  const [category, setSelectedCategory] = useState(undefined);
  const [subCategory, setSubCategory] = useState(undefined);
  const [states, setStates] = useState([]);

  const getCategories = async () => {
    const data = await getCategoryApi();
    console.log(data, 'data 22')

    // const updateData = data?.map((item) => ({
    //   ...item,
    //   id: item?._id,
    // }));
    setCategories(data);
  };

  const getStates = async () => {
    const data = await getStatesApi();
    setStates(data);
  };

  const setSubCategories = (id) => {
    console.log(id, 'id 1')
    const data = categories.find((cat) => cat._id === id);
    console.log(data, 'data')
    setSelectedCategory(data?.value);
    setSelectedSubCategories(data?.childern);
    setTags(data?.tags);
  };

  useEffect(() => {
    const isProfileCompleted = localStorage.getItem("isProfileCompleted");
    setProfileCompleted(isProfileCompleted);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getCategories();
    getStates();
    setToken(token);
  }, []);

  return (
    <Spin spinning={false}>
      <Layout>
        <FilterProvider
          value={{
            categories,
            selectedSubCategories,
            setSubCategories,
            category,
            token,
            setToken,
            states,
            tags,
            subCategory,
            setSubCategory,
          }}
        >
          <Navbar />
          <Content className="layout-content">
            <Switch>
              <Route exact path="/" component={Demo} />
              <Route exact path="/signin" component={SignIn} />
              <LoginRoute exact path="/my-profile" component={MyProfile} />
              <Route exact path="/timeline" component={TimeLine} />
              <LoginRoute exact path="/messages" component={Messages} />
              <LoginRoute
                exact
                path="/profile/:id"
                component={ProfileDetails}
              />
              <LoginRoute exact path="/admin" component={AdminPanel} />
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
          <Footer />
        </FilterProvider>
      </Layout>
    </Spin>
  );
};
export default App;
