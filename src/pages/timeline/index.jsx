import React, { useState, useEffect } from "react"
import { getAllUsersApi, useUserQuery } from "../../api/user";
import TimeLineCard from "../../common/timeline-card";

import './timelineStyle.less'

const TimeLine = () => {

  const { data } = useUserQuery();
  const [allUsers, setAllUsers] = useState([]);

  // useEffect(() => {
  //   getDetails();
  // }, [])

  // const getDetails = async() => {
    // const data = await getAllUsersApi();
    const timeLineArray = data?.filter((user) => user.thumbnails.length)
        .map((item) => item.thumbnails
        .map((dt) => {return ({...dt, name: item.fullName, id: item._id, dp: item.thumbnails.find((img) => img.dp )?.url})}
        )).flat().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    // setAllUsers(timeLineArray);
  // }
  return (
    <div className="timeline-main-container">
      {
        timeLineArray?.map((user) => (
          <>
          <TimeLineCard user={user} />
          <TimeLineCard user={user} />
          <TimeLineCard user={user} />
          <TimeLineCard user={user} />
          </>
        ))
      }
    </div>
  )
}

export default TimeLine