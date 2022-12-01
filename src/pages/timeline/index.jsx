import React, { useEffect } from "react";
import { useUpdateUserNameMutation, useUserQuery } from "../../api/user";
import TimeLineCard from "../../common/timeline-card";
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";

import "./timelineStyle.less";
import { Spin } from "antd";

const TimeLine = () => {
  const { data } = useUserQuery();
  const {mutate: fetchserNameMutation, isLoading} = useUpdateUserNameMutation()

  useEffect(() => {
    fetchserNameMutation();
  }, [])


  const timeLineArray = data?.users
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
  return (
    <Spin spinning={isLoading}>
      <div className="timeline-main-container">
        {timeLineArray?.length ? (
          timeLineArray?.map((user) => (
            <TimeLineCard user={user} />
        ))) : <EmptyMessage />}
      </div>
    </Spin>
  );
};

export default TimeLine;
