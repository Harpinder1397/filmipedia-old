import TimeLineCard from "../../common/timeline-card";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AWS_URL } from '../../../env.json';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
    }}
    spin
  />
);

const InfiniteScrollTwo = () => {
  const [data, setData] = useState([])

  const fetchMoreData = () => {
    fetch(`${AWS_URL}/user`)
      .then((res) => res.json())
      .then((body) => {
        console.log(body, 'bodybodybodybody')
        setTimeout(() => {
        setData([...data, ...body?.users]);

        }, 1500);
      })
      .catch(() => {
        // setLoading(false);
      });
    
  };

  useEffect(() => {
    fetchMoreData();
  }, []);


    return (
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<div style={{textAlign: 'center', marginTop: '40px'}}><Spin indicator={antIcon} /></div>}
        >
        <List
          dataSource={data}
          renderItem={(item) => (
            <TimeLineCard user={item} />
          )}
          ></List>
        </InfiniteScroll>
    );
}

export default InfiniteScrollTwo;
