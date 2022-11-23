import React, { useState, useEffect } from "react";
import { Button, DatePicker, Input, Modal, InputNumber, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import JobCard from "./card";
import { useCreateJobMutation, useDeleteJobMutation, useJobsQuery, useUpdateJobMutation, useUpdateJobsMutation } from "../../api/getJobs";
import { useCreateJobApplicationsMutation } from "../../api/getJobApplications";
import { getUserApi } from "../../api/user";

// styles
import "./card/cardStyle.less";

const Jobs = () => {
  const userId = localStorage.getItem('user');
  const [formData, setFormData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add");


  const { data } = useJobsQuery();
  const { mutate: fetchJobList } = useUpdateJobsMutation();
  const { mutate: createJobMutation, isSuccess, isLoading } = useCreateJobMutation();
  const { mutate: deleteJobMutation, } = useDeleteJobMutation();
  const { mutate: updateJobMutation, } = useUpdateJobMutation();
  const { mutate: createJobApplications } = useCreateJobApplicationsMutation()  
  
  const showModal = () => {
    setModalTitle("Add");
    setIsModalOpen(true);
    setFormData({});
  };

  const handleOk = () => {
    if(modalTitle == "Add"){
      const payload = {
        ...formData,
        postedByCategory: userInfo.category,
        postedById: userInfo?._id,
        postedByName: userInfo?.fullName,
      }
      createJobMutation(payload);
      if(isSuccess || !isLoading){
        setIsModalOpen(false);
        setFormData({});
      }
    }else {
      const payload = formData
      updateJobMutation(payload);
      if(isSuccess || !isLoading){
        setIsModalOpen(false);
        setFormData({});
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShareDetails = (value) => {
    console.log(value, 'value')
    const payload = {
      sharedById: userInfo?._id,
      sharedByName: userInfo?.fullName,
      // sharedByDp: value.postedById,
      sharedByCategory: userInfo?.category,
      sharedByExperience: userInfo?.experience,
      sharedTo: value.postedById,
      jobId: value._id,
      jobTitle: value.jobTitle,
      appliedDate: value.postedTill,
      jobExpired: value.postedTill,
    }
    createJobApplications(payload)
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
		const data = await getUserApi(userId);
    setUserInfo(data);
  }

  useEffect(() => {
    fetchJobList();
    fetchUserDetails();
  }, []);

  return (
    <div className="jobcard-page-body">
      <Button type="primary" className="modal-btn" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
        <label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> End date:
        </label>
        <Space direction="vertical" size={12}>
          <DatePicker
            format="DD-MM-YYYY"
            // value={formData?.postedTill}
            onChange={(e, value) => {
              setFormData({...formData, postedTill: value})
              console.log(value, 'value')
            }}
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
      <JobCard
        data={data}
        handleShareDetails={handleShareDetails}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Jobs;
