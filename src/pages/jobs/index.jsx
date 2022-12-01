import React, { useState, useEffect } from "react";
import { Button, Input, Modal, InputNumber, Space, message, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import JobCard from "./card";
import { useCreateJobMutation, useDeleteJobMutation, useJobsQuery, useUpdateJobMutation, useUpdateJobsMutation } from "../../api/getJobs";
import { useCreateJobApplicationsMutation, useJobApplicationsQuery, useUpdateJobApplicationsMutation } from "../../api/getJobApplications";
import { useGetUserDataQuery, useGetUserQuery } from "../../api/user";
import FormInput from '../../common/inputs/FormInput';
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";

// styles
import "./card/cardStyle.less";
import CommonPagination from "../../common/pagination/CommonPagination";
// import moment from "moment";

const Jobs = () => {
  const userId = localStorage.getItem('user');
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add");
  const [messageApi, contextHolder] = message.useMessage();
  
  const { data: jobList, isLoading: loading1} = useJobsQuery();
  const { data: userInfo, isLoading: loading8} = useGetUserDataQuery();
  
  const { data: jobApplicationsList } = useJobApplicationsQuery();
  const { mutate: jobApplicationsMutation } = useUpdateJobApplicationsMutation();
  const { mutate: fetchJobList, isLoading: loading2} = useUpdateJobsMutation();
  const { mutate: createJobMutation, isSuccess, isLoading: loading3 } = useCreateJobMutation();
  const { mutate: deleteJobMutation, isLoading: loading4} = useDeleteJobMutation();
  const { mutate: updateJobMutation, isLoading: loading5} = useUpdateJobMutation();

  const { mutate: createJobApplications} = useCreateJobApplicationsMutation()
  const { mutate: getUserQuery, isLoading: loading6} = useGetUserQuery();


  const mainLoader = loading1 || loading2 || loading3 || loading4 || loading5

  const showModal = () => {
    setModalTitle("Add");
    setIsModalOpen(true);
    setFormData({});
    
  };

  
  const handleOk = () => {
    if(modalTitle == "Add"){
      const payload = {
        ...formData,
        // thumbnail: fileList,
        postedByCategory: userInfo.category,
        postedById: userInfo?._id,
        postedByName: userInfo?.fullName,
      }
      if(formData?.postedTill && formData?.jobTitle && formData?.requirement && formData?.content){
        createJobMutation(payload);
        if(isSuccess || !loading4){
          setIsModalOpen(false);
          setFormData({});
        }
      }else {
        messageApi.open({
          type: 'error',
          content: 'Please Fill Required Fields',
        });
      }
    }else {
      const payload = formData
      updateJobMutation(payload);
      if(isSuccess || !loading4){
        setIsModalOpen(false);
        setFormData({});
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      // limit: limit
    };
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
    fetchJobList(payload);
  }

  const handleUpdate = (item) => {
    setFormData(item);
    setIsModalOpen(true);
    setModalTitle("Edit");
  }

  const handleDelete = (id) => {
    deleteJobMutation(id);
  }

  const fetchUserDetails = async () => {
    getUserQuery(userId)
  }

  useEffect(() => {
    fetchJobList();
    fetchUserDetails();
    jobApplicationsMutation(userId);
  }, []);

  console.log(jobApplicationsList, 'jobApplicationsList')

  return (
    <Spin spinning={mainLoader}>
    {contextHolder}
    <div className="jobcard-page-body">
      <Button type="primary" className="modal-btn" onClick={showModal}>
        Job Create
      </Button>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
     {/* <ImageCrop fileList={fileList} setFileList={setFileList} /> */}
        <div>
          <label className="input-label">
            <span style={{ color: "red", fontSize: "18px" }}>*</span> Posted By
            Name :
          </label>
          <Input
            placeholder="Posted By Name"
            value={userInfo?.fullName}
            disabled
          />
        </div>
        <div>
          <label className="input-label">
            <span style={{ color: "red", fontSize: "18px" }}>*</span> Job Title
            :
          </label>
          <Input
            placeholder="Job Title"
            value={formData?.jobTitle}
            onChange={(e) => {
              setFormData({ ...formData, jobTitle: e.target.value });
            }}
          />
        </div>
        <label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> Requirement
          :
        </label>
        <InputNumber
          placeholder="Requirement"
          style={{width: '100%'}}
          value={formData?.requirement}
          onChange={(e) => {
            setFormData({
              ...formData,
              requirement: e,
            });
          }}
        />
        {/*<label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> Category :
        </label>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          value={formData?.postedByCategory}
          onChange={(value) => setFormData({ ...formData, postedByCategory: value })}
          onSearch={onSearch}
          //   filterOption={(input, option) =>
          //     (option.label "").toLowerCase().includes(input.toLowerCase())
          //   }
          options={[
            {
              value: "actor",
              label: "actor",
            },
            {
              value: "actress",
              label: "actress",
            },
            {
              value: "other",
              label: "other",
            },
          ]}
        />*/}
        {/* <label className="input-label">
            <span style={{ color: "red", fontSize: "18px" }}>*</span>Start date:
          </label>
          <Space direction="vertical" size={12}>
            <DatePicker
              defaultValue={dayjs("01/01/2015", dateFormatList[0])}
              format={dateFormatList}
              onChange={(e) => console.log(e.target.value, "data picker")}
            />
          </Space> */}
        {/*<label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> End date:
        </label>*/}
        <Space direction="vertical" size={12}>
          {/*<DatePicker
            // format="DD-MM-YYYY"
            // value={formData?.postedTill}
            format={dateFormatList}
            // value={dayjs(formData?.postedTill, 'DD-MM-YYYY')}
            selected={dateSet || ''}
            placeholder={formData?.postedTill}
            onChange={(e, value) => {
              setFormData({...formData, postedTill: e?._d})
              console.log(e, 'e?._d')
            }}
          />*/}
          <FormInput
            type="date"
            name="postedTill"
            label="End date:"
            value={formData?.postedTill}
            onChange={(e)=> {
              setFormData({...formData, postedTill: e.target.value})
            }}
            // validationError={formDataErrors.dateOfBirth}
            required
          // disabled
          />
        </Space>
        {/* <label className="input-label">Time :</label>
          <Select
            mode="multiple"
            placeholder="Select time"
            showArrow
            tagRender={tagRender}
            defaultValue={["gold", "cyan"]}
            style={{
              width: "100%",
            }}
            options={options}
          />
          */}
        <label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> Bio :
        </label>
        <TextArea
          rows={4}
          placeholder="Maxlenth 250 character..............."
          maxLength={250}
          value={formData?.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </Modal>
       {jobList?.data?.length ? <JobCard
          userId={userId}
          data={jobList?.data}
          jobApplicationsList={jobApplicationsList}
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
