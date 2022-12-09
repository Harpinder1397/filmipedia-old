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
  const [page, setPage] = useState(1)
  const { data: userList, isLoading } = useUserQuery();
  const [data, setData] = useState(userList?.users || [])
  const [dataAdd, setDataAdd] = useState([])


  const fetchMoreData = () => {
    setPage(page + 1)
    const payload = {...formData, page: page};
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    setTimeout(() => {
      userNameMutation(payload)
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

  console.log(dataAdd, 'dataAdddataAdddataAdd')

  useEffect(() => {
    fetchMoreData();
  }, []);


    return (
        <InfiniteScroll
          dataLength={dataAdd?.length}
          next={fetchMoreData}
          hasMore={dataAdd?.length}
          loader={<div style={{textAlign: 'center', marginTop: '40px'}}><Spin indicator={antIcon} /></div>}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
        <List
          dataSource={dataAdd}
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
