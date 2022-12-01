import React, { useState, useEffect } from "react";
import { getAllUsersApi, useUserQuery } from "../../api/user";
import TimeLineCard from "../../common/timeline-card";

import "./timelineStyle.less";

const TimeLine = () => {
  const { data } = useUserQuery();
  const [allUsers, setAllUsers] = useState([]);

  // useEffect(() => {
  //   getDetails();
  // }, [])

  // const getDetails = async() => {
  // const data = await getAllUsersApi();
  const timeLineArray = data
    ?.filter((user) => user.thumbnails.length)
    .map((item) =>
      item.thumbnails.map((dt) => {
        return {
          ...dt,
          name: item.fullName,
          id: item._id,
          dp: item.thumbnails.find((img) => img.dp)?.url,
        };
      })
    )
    .flat()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // setAllUsers(timeLineArray);
  // }
  return (
    <div className="timeline-main-container">
      <div className="info-left-container">
        <div className="image-box">
          <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg" />
        </div>
        <span style={{ textAlign: "center", lineHeight: "10px" }}>
          <h1>khushvinder singh </h1>
          <p>Front-end developer </p>
        </span>
      </div>
      <div className="center-card-container">
        {timeLineArray?.map((user) => (
          <>
            <TimeLineCard user={user} />
          </>
        ))}
      </div>
      <div className="right-container">
        <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <li>publishing and graphic design, Lorem ipsum is a</li>
          <li>publishing and graphic design, Lorem ipsum is a</li>
          <li>publishing and graphic design, Lorem ipsum is a</li>
          <li>publishing and graphic design, Lorem ipsum is a</li>
          <li>publishing and graphic design, Lorem ipsum is a</li>
          <li>publishing and graphic design, Lorem ipsum is a</li>
        </ul>
      </div>
    </div>
  );
};

export default TimeLine;
