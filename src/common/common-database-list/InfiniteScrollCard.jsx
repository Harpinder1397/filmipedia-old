import TimeLineCard from "../timeline-card";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AWS_URL } from '../../../env.json';
import CommonList from "../../common/CommonList";
import CommonCard from "../../common/common-card";
import { useUpdateUserNameMutation } from "../../api/user";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
    }}
    spin
  />
);

const InfiniteScrollCard = ({allUsers}) => {
  console.log(allUsers, 'allUsers')

  const [data, setData] = useState([1])
  const [limit, setLimit] = useState(9);
  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();

  const setLimitSize = () => {
    const payload = {
      // ...formData,
      limit: limit,
      // limit: limit
    };
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    userNameMutation(payload)
  }

  // const [dataLength, setDataLength] = useState(0)
  console.log(limit, 'limit')
  const fetchMoreData = () => {
    setLimit(limit + 9);
    fetch(`${AWS_URL}/user`)
      .then((res) => res.json())
      .then((body) => {
        console.log(body, 'bodybodybodybody')
        setTimeout(() => {
        setData([...data, ...body?.users]);
        // setDataLength(body.length)
        }, 1500);
      })
      .catch(() => {
        // setLoading(false);
      });
    
  };

  useEffect(() => {
    // fetchMoreData();
    setLimitSize()
  }, [limit]);


    return (
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchMoreData}
          hasMore={data?.length < data?.length + 1}
          loader={<div style={{textAlign: 'center', marginTop: '40px'}}><Spin indicator={antIcon} /></div>}
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
        <List
          dataSource={data}
          renderItem={(user) => (
            <CommonCard
                  user={user}
                  // favList={data}
                  // handleFavourite={handleFavourite}
                  // handleRemoveFavourite={handleRemoveFavourite}
                  // isFav={isFav}
                />

          )}
          ></List>
        </InfiniteScroll>
    );
}

export default InfiniteScrollCard;
