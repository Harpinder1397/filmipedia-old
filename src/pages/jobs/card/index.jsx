import React from "react";
import {
  CloseOutlined,
  EditOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PopConfirm from "../../../common/pop-confirm";

// styles
import "./cardStyle.less";
import { Divider } from "antd";

const JobCard = ({ data, handleShareDetails, handleUpdate, handleDelete }) => {
  return (
    <>
      <div className="jobcard-page-body">
        <div className="job-card-outer-container">
          {data?.map((item) => {
            return (
              <div className="jobcard-container">
                <PopConfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    handleDelete(item._id);
                  }}
                  body={<CloseOutlined />}
                />

                <div className="info-image-container">
                  <div className="jobcard-image">
                    <img src="https://bareillycollege.org/wp-content/uploads/2022/09/chris-evans.webp" />
                  </div>
                  <div className="jobcard-info">
                    <h1 className="user-name">
                      {item.postedByName}
                      <EditOutlined onClick={() => handleUpdate(item)} />
                    </h1>
                    <p className="job-title">{item.jobTitle}</p>
                    <p>{item.content}</p>
                  </div>
                </div>

                <div className="job-details">
                  <div className="details">
                    <strong>Category</strong>
                    {item.postedByCategory}
                  </div>
                  <div className="details">
                    <strong>requirement</strong>
                    {item.requirement}
                  </div>
                  {/*<div className="details">
                  {item.postedOn}
                  <strong>PostedOn</strong>
          </div>*/}
                  <div className="details">
                    <strong>Exp</strong>
                    {item.postedTill}
                  </div>
                </div>
                <div className="job-card-footer">
                  <button
                    className="massage"
                    onClick={() => handleShareDetails(item)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="new-card-display">
        {/* new card start.. */}
        <div className="new-card-container">
          <div className="card-content-container">
            <div>
              <h1>
                Area Collection Manager{" "}
                <EditOutlined style={{ cursor: "pointer", fontSize: "19px" }} />
                <CloseOutlined
                  style={{ cursor: "pointer", fontSize: "19px" }}
                />
              </h1>
              <b>
                <UserOutlined /> shared by-: <i> khushvinder singh</i>
              </b>
              <p style={{ marginTop: "7px" }}>
                <UsergroupAddOutlined style={{ marginRight: "5px" }} />
                Actor
              </p>
              <p>
                {" "}
                <img
                  src="https://www.svgrepo.com/show/127575/location-sign.svg"
                  width={"12px"}
                  style={{ marginRight: "5px" }}
                />
                Ludhiana (Punjab)
              </p>

              <p style={{ margin: "11px 0 16px" }}>
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/writing-2779694-2324192.png"
                  width={"19px"}
                  style={{ marginRight: "4px" }}
                />
                Free Download Location Sign SVG vector file in monocolor and
                multicolor type for Sketch or Illustrator from Location Sign
              </p>
            </div>
            <div className="card-bottom-content">
              <span>
                Poste: <b> 2 days ago</b>
              </span>
              <span>
                Openings: <b> 2</b>
              </span>
              <span>
                Job Applicants: <b> 265</b>
              </span>
            </div>
          </div>
          {/* .... */}
          <div className="image-container">
            <div className="image-box">
              <img src="https://t3.ftcdn.net/jpg/04/93/13/42/360_F_493134256_DsdRygnyk1VflTXXuAjI211fWJqDLu1W.jpg" />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button className="apply-btn">Apply</button>
              <span>
                left: <b> 2 day</b>
              </span>
            </div>
          </div>
        </div>
        {/* new card start.. */}
        <div className="new-card-container">
          <div className="card-content-container">
            <div>
              <h1>
                Area Collection Manager{" "}
                <EditOutlined style={{ cursor: "pointer", fontSize: "19px" }} />
              </h1>
              <b>
                <UserOutlined /> shared by-: <i> khushvinder singh</i>
              </b>
              <p style={{ marginTop: "7px" }}>
                <UsergroupAddOutlined style={{ marginRight: "5px" }} />
                Actor
              </p>
              <p>
                {" "}
                <img
                  src="https://www.svgrepo.com/show/127575/location-sign.svg"
                  width={"12px"}
                  style={{ marginRight: "5px" }}
                />
                Ludhiana (Punjab)
              </p>

              <p style={{ margin: "11px 0 16px" }}>
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/writing-2779694-2324192.png"
                  width={"19px"}
                  style={{ marginRight: "4px" }}
                />
                Free Download Location Sign SVG ector collection. Location Sign
              </p>
            </div>
            <div className="card-bottom-content">
              <span>
                Poste: <b> 2 days ago</b>
              </span>
              <span>
                Openings: <b> 2</b>
              </span>
              <span>
                Job Applicants: <b> 265</b>
              </span>
            </div>
          </div>
          {/* .... */}
          <div className="image-container">
            <div className="image-box">
              <img src="https://t3.ftcdn.net/jpg/04/93/13/42/360_F_493134256_DsdRygnyk1VflTXXuAjI211fWJqDLu1W.jpg" />
            </div>
            <span>
              left: <b> 2 day</b>
            </span>
          </div>
        </div>
        {/* new card start.. */}
        <div className="new-card-container">
          <div className="card-content-container">
            <div>
              <h1>
                Area Collection Manager{" "}
                <EditOutlined style={{ cursor: "pointer", fontSize: "19px" }} />
              </h1>
              <b>
                <UserOutlined /> shared by-: <i> khushvinder singh</i>
              </b>
              <p style={{ marginTop: "7px" }}>
                <UsergroupAddOutlined style={{ marginRight: "5px" }} />
                Actor
              </p>
              <p>
                {" "}
                <img
                  src="https://www.svgrepo.com/show/127575/location-sign.svg"
                  width={"12px"}
                  style={{ marginRight: "5px" }}
                />
                Ludhiana (Punjab)
              </p>

              <p style={{ margin: "11px 0 16px" }}>
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/writing-2779694-2324192.png"
                  width={"19px"}
                  style={{ marginRight: "4px" }}
                />
                Free Download Location Sign SVG vector file in monocolor and
                multicolor type for Sketch or Illustrator from Location Sign
              </p>
            </div>
            <div className="card-bottom-content">
              <span>
                Poste: <b> 2 days ago</b>
              </span>
              <span>
                Openings: <b> 2</b>
              </span>
              <span>
                Job Applicants: <b> 265</b>
              </span>
            </div>
          </div>
          {/* .... */}
          <div className="image-container">
            <div className="image-box">
              <img src="https://t3.ftcdn.net/jpg/04/93/13/42/360_F_493134256_DsdRygnyk1VflTXXuAjI211fWJqDLu1W.jpg" />
            </div>
            <span>
              left: <b> 2 day</b>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
