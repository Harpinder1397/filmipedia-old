import React, { useState, useEffect } from "react";
import { Typography, Spin } from "antd";
import JobCard from "./card";
import { useDeleteJobMutation, useJobsQuery, useUpdateJobsMutation } from "../../api/getJobs";
import { useCreateJobApplicationsMutation, useJobApplicationsQuery, useJobAllApplicationsMutation, useUpdateJobApplicationsMutation, useJobAllApplicationsQuery } from "../../api/getJobApplications";
import { useGetUserDataQuery, useGetUserQuery } from "../../api/user";
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";

// styles
import "./card/cardStyle.less";
import CommonPagination from "../../common/pagination/CommonPagination";

const { Title } = Typography;

const Jobs = () => {
  const userId = localStorage.getItem('user');
  const [formData, setFormData] = useState({});
  
  const { data: jobList, isLoading: loading1} = useJobsQuery();
  const { data: userInfo, isLoading: loading8} = useGetUserDataQuery();  
  const { data: jobApplicationsList } = useJobApplicationsQuery();
  const { data: allJobApplicationsList } = useJobAllApplicationsQuery();
  const { mutate: jobApplicationsMutation, isLoading: loading9} = useUpdateJobApplicationsMutation();
  const { mutate: getAllApplicationsMutation, isLoading: loading7} = useJobAllApplicationsMutation();
  const { mutate: fetchJobList, isLoading: loading2} = useUpdateJobsMutation();
  const { mutate: deleteJobMutation, isLoading: loading4} = useDeleteJobMutation();
  const { mutate: createJobApplications, isLoading: loading5} = useCreateJobApplicationsMutation()
  const { mutate: getUserQuery, isLoading: loading6} = useGetUserQuery();

  const mainLoader = loading1 || loading2 || loading4 || loading5 || loading9 || loading7


  const handleShareDetails = (value) => {
    const payload = {
      sharedById: userInfo?._id,
      sharedByName: userInfo?.fullName,
      // sharedByDp: value.postedById,
      sharedByCategory: userInfo?.category,
      sharedByExperience: userInfo?.experience,
      sharedTo: value.postedById,
      jobId: value._id,
      jobTitle: value.jobTitle,
      appliedDate: value.postedOn,
      jobExpired: value.postedTill,
      status: true
    }
    createJobApplications(payload)
  }

  const onShowSizeChange = (page, limit) => {
    const payload = {
      ...formData,
      page: page,
      userId: userId
      // limit: limit
    };
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
    fetchJobList(payload);
    getAllApplicationsMutation();
  }

  const handleUpdate = (item) => {
    setFormData(item);
  }

  const handleDelete = (id) => {
    deleteJobMutation(id);
  }

  const fetchUserDetails = async () => {
    getUserQuery(userId)
  }

  const fetchJobApplicationsMutation = () => {
    const payload = {
      userId: userId
    };
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    jobApplicationsMutation(payload);
  }

  useEffect(() => {
    const payload = {
      userId: userId
    };
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
    fetchJobList(payload);
    fetchUserDetails();
    fetchJobApplicationsMutation();
    getAllApplicationsMutation();
  }, []);

  return (
    <Spin spinning={mainLoader}>
    <Title level={3}>Jobs List</Title>
    <div className="jobcard-page-body">
       {jobList?.data?.length ? <JobCard
          userId={userId}
          data={jobList?.data}
          jobApplicationsList={jobApplicationsList}
          allJobApplicationsList={allJobApplicationsList}
          handleShareDetails={handleShareDetails}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        // JobApplicationsLength={jobApplicationsData?.length || 0}
      /> : (
       <EmptyMessage />
      )}

      <div className="pagination-section">
      {jobList?.data?.length >= 9 && <CommonPagination total={jobList?.data?.length} onShowSizeChange={onShowSizeChange}/>}
       </div>
    </div>
    </Spin>
  );
};

export default Jobs;
