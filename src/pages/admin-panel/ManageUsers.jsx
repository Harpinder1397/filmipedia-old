import React, { useEffect, useState } from "react";
import TableComponent from "../../common/TableComponent";
import { Switch, Typography, Spin } from "antd";
import './admin.less';
import { updateUserApi, useUpdateUserNameMutation, useUserQuery } from "../../api/user";
import CommonPagination from "../../common/pagination/CommonPagination";

const { Title } = Typography;

const ManageUsers = ({states }) => {
  const [isloading, setIsloading] = useState(false);

  const { data: userList } = useUserQuery();
  const {mutate: fetchserNameMutation, isLoading} = useUpdateUserNameMutation()

  console.log(userList, 'userList')

  const onShowSizeChange = (page, limit) => {
    const payload = {
      page: page,
      // limit: limit
    };
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    fetchserNameMutation(payload);
  }

  const handleOnChange = async (checked, row) => {
    setIsloading(true);
    const payload = {...row, verified: checked}
    await updateUserApi(row?._id, payload).then(() => {
        setIsloading(false);
      })
    setIsloading(false);
    fetchserNameMutation();

  };

  // Users Table Columns
  const userCol = [
    {
        title: 'Full Name',
        key: 'fullName',
        dataIndex: 'fullName',
    },
    {
        title: 'Id',
        key: '_id',
        dataIndex: '_id',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (text, row) =>
      <Switch checked={row?.verified} onChange={(e) => handleOnChange(e,row)} />
    }
  ]

  useEffect(() => {
    // const payload = searchQuery.name ? searchQuery :  {'state' : searchQuery.state }
    // if(searchQuery?.name || searchQuery?.state){
    //   if(searchQuery?.name){
    //     const timeOutId = setTimeout(async() => {
    //       fetchStatesMutation(payload)
    //     }, 1000);
    //     return () => clearTimeout(timeOutId);
    //   }else {
    //     fetchStatesMutation(payload);
    //   }
    // }else {
    //   fetchStatesMutation();
    // }
    fetchserNameMutation();
  }, []);

  return (
    <Spin spinning={isLoading || isloading}>
    <div className="all-states">
    <Title level={3}>Users</Title>
      <TableComponent
        columns={userCol}
        data={userList?.users || []}
        paginationProp={false}
        // onChange={hanlePaginationChange}
        // onChange={hanlePaginationChange}
      />
      <div className="pagination-section">
      {userList?.total >= 9 && <CommonPagination total={userList?.total} onShowSizeChange={onShowSizeChange}/>}
       </div>
    </div>
    </Spin>
  )
}

export default ManageUsers;