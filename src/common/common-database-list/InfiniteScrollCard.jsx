import TimeLineCard from "../../common/timeline-card";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AWS_URL } from '../../../env.json';
import CommonCard from "../../common/common-card";
import { useUserQuery } from "../../api/user";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
    }}
    spin
  />
);

const InfiniteScrollCard = ({formData, userNameMutation}) => {
  const [page, setPage] = useState(0)
  const { data: userList, isLoading } = useUserQuery();
  const [data, setData] = useState(userList?.users || [])
  const [dataAdd, setDataAdd] = useState([])
  const [updateData, setUpdateData] = useState(userList.users)
console.log(updateData, 'updateDataupdateData')
  const fetchMoreData = () => {
    setPage(page + 1)
    const payload = {...formData, page: page + 1};
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    setTimeout(() => {
      userNameMutation(payload)
      setUpdateData([...updateData, ...userList.users])
      // setData(userList?.users);
      setDataAdd([...dataAdd, ...userList?.users])
    }, 1500);

    // fetch(`${AWS_URL}/user`)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setDataLength(dataLength + 9)
    //     console.log(body, 'bodybodybodybody')
    //     setTimeout(() => {
    //     setData([...data, ...body?.users]);
    //     // setDataLength(body.length)
    //     }, 1500);
    //   })
      // .catch(() => {
        // setLoading(false);
      // });
    
  };


  useEffect(() => {
    fetchMoreData();
  }, []);


    return (
        <InfiniteScroll
          dataLength={updateData?.length}
          next={fetchMoreData}
          hasMore={updateData?.length}
          loader={<div style={{textAlign: 'center', marginTop: '40px'}}><Spin indicator={antIcon} /></div>}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
        <List
          dataSource={updateData}
          renderItem={(item) => (
            <CommonCard
              user={item}
            />
          )}
          ></List>
        </InfiniteScroll>
    );
}

export default InfiniteScrollCard;
