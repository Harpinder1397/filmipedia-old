import React from "react";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

// styles
import "./cardStyle.less";
import PopConfirm from "../../../common/pop-confirm";

const JobCard = ({ data, handleShareDetails, handleUpdate, handleDelete }) => {
  return (
    <div className="jobcard-page-body">
      <div className="job-card-outer-container">
        {data?.map((item) => {
          return (
            <div className="jobcard-container">
            <PopConfirm
                  title='Are you sure?'
                  onConfirm={() => {
                    handleDelete(item._id)
                  }}
                  body={
                    <CloseOutlined />
                  }
                />
             

              <div className="info-image-container">
                <div className="jobcard-image">
                  <img src="https://bareillycollege.org/wp-content/uploads/2022/09/chris-evans.webp" />
                </div>
                <div className="jobcard-info">
                  <h1 className="user-name">
                    {item.postedByName}
                    <EditOutlined
                      onClick={() => handleUpdate(item)}
                    />
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
                <button className="massage" onClick={()=> handleShareDetails(item)}>Apply</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobCard;
