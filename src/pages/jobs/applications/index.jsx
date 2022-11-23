import TableComponent from "../../../common/TableComponent";
import React, { useEffect } from "react";
import { Typography } from "antd";
import { useJobApplicationsQuery, useUpdateJobApplicationsMutation } from "../../../api/getJobapplications";

const { Title } = Typography;

const JobApplications = () => {
  const { data } = useJobApplicationsQuery();
  const { mutate: jobApplicationsMutation } = useUpdateJobApplicationsMutation();


//   applied on (jobTitle) (opens the job details on hover)
// 2. Name (sharedByName) (opens the profile page in right side)
// 3. Category (sharedByCategory) 
// 4. Experience (sharedByExperience)
// 5. job Expired(jobExpire)

  const stateCol = [
    {
      title: "jobTitle",
      key: "jobTitle",
      dataIndex: "jobTitle",
    },
    {
      title: "Name",
      key: "sharedByName",
      dataIndex: "sharedByName",
    },
    {
      title: "Category",
      key: "sharedByCategory",
      dataIndex: "sharedByCategory",
    },
    {
      title: "Experience",
      key: "sharedByExperience",
      dataIndex: "sharedByExperience",
    },
    {
      title: "Job Expired",
      key: "jobExpired",
      dataIndex: "jobExpired",
    },
    // {
    //   title: "action",
    //   key: "action",
    //   dataIndex: "action",
      // render: (text, row) =>
      // <>
      //   <EditOutlined
      //     onClick={() => {
      //       setIsEditModal('edit');
      //       setIsVisible(true);
      //       setFormData(row);
      //   }}/>
      //   <PopConfirm
      //     title='Are you sure?'
      //     onConfirm={ async() => {
      //       const res = await deleteStateApi(row._id);
      //       if(res){
      //         fetchStatesMutation();
      //       }
      //     }}
      //     body={
      //       <DeleteOutlined className="state-delete-btn" />
      //     }
      //   />

      // </>
    // },
  ];

  useEffect(() => {
    jobApplicationsMutation()
  }, [])
  

  return (
    <>
      <Title level={3}>Job Applications</Title>
      <TableComponent
        columns={stateCol}
        data={data?.sort((a, b) => a?.state?.localeCompare(b?.state))}
      />
    </>
  );
};

export default JobApplications;
