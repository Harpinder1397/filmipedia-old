import {
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Tag,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import React, { useState } from "react";
import "./jobCardStyle.less";

const NotFound = () => {
  const [show, setshow] = useState(true);
  const [inputValue, setInputValue] = useState({});
  console.log(inputValue, "inputValue");

  const [jobList, setJobList] = useState([]);
  const [modalTitle, setModalTitle] = useState("Add");

  console.log(jobList, "jobList");
  const [edit, setedit] = useState();
  console.log(edit, "edit id");
  // Modal ..............................
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setModalTitle("Add");
    setIsModalOpen(true);
    setInputValue({});
  };
  const handleOk = () => {
    if (!inputValue.jobtitle) {
      alert("Please enter value");
      return;
    } else if (modalTitle == "Add") {
      setIsModalOpen(false);
      setJobList([...jobList, inputValue]);
      setshow(false);
      setInputValue({});
    } else {
      const editList = jobList.map((v) => {
        if (v.user == edit.user) {
          return {
            ...v,
            user: inputValue.user,
            jobtitle: inputValue.jobtitle,
            experience: inputValue.experience,
            category: inputValue.category,
          };
        }
        return v;
      });
      setJobList(editList);
      setIsModalOpen(false);
      setInputValue({});
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // ..
  // const dateFormat = "YYYY/MM/DD";
  // const weekFormat = "MM/DD";
  // const monthFormat = "YYYY/MM";
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const customWeekStartEndFormat = (value) =>
    console.log(value, "date picker")`${dayjs(value)
      .startOf("week")
      .format(weekFormat)} ~ ${dayjs(value).endOf("week").format(weekFormat)}`;

  // select full-time and part-time code..............
  // const options = [
  //   {
  //     value: "Full-time",
  //   },
  //   {
  //     value: "Part-time",
  //   },
  // ];
  // const tagRender = (props) => {
  //   console.log(props, "select props");
  //   const { label, value, closable, onClose } = props;
  //   console.log(value, "value");
  //   const onPreventMouseDown = (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };
  //   return (
  //     <Tag
  //       // color={value}
  //       onMouseDown={onPreventMouseDown}
  //       closable={closable}
  //       onClose={onClose}
  //       style={{
  //         marginRight: 3,
  //       }}
  //     >
  //       {label}
  //     </Tag>
  //   );
  // };

  // category select.............
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setInputValue({ ...inputValue, category: value });
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  // Delete Item function.....................................

  const deleteItem = (user) => {
    const deleIetem = jobList?.filter((elem) => {
      return elem.user !== user;
    });
    setJobList(deleIetem);
  };
  //   Edit Item function.....................................
  const editItem = (it) => {
    setModalTitle("Edit");
    // console.log(it, "it it it it");
    const editData = jobList.filter((v) => {
      return v.user == it.user;
    });
    console.log(editData[0].user, "editdata ");
    setInputValue(editData[0]);
    setshow(true);
    setIsModalOpen(true);
    setedit(it);
  };
  // ...........
  return (
    <div className="jobcard-page-body">
      <Button type="primary" className="modal-btn" onClick={showModal}>
        Open Modal
      </Button>{" "}
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span>User
        </label>
        <Input
          placeholder="user name"
          value={inputValue.user}
          onChange={(e) => {
            setInputValue({ ...inputValue, user: e.target.value });
          }}
        /> */}
        <label className="input-label">
          {" "}
          <span style={{ color: "red", fontSize: "18px" }}>*</span>jobtitle :
        </label>
        <Input
          placeholder="jobtitle"
          value={inputValue.jobtitle}
          onChange={(e) => {
            setInputValue({ ...inputValue, jobtitle: e.target.value });
          }}
        />
        <label className="input-label">
          {" "}
          <span style={{ color: "red", fontSize: "18px" }}>*</span>Requirement :
        </label>
        <Input
          placeholder="Requirement"
          value={inputValue.experience}
          onChange={(e) => {
            setInputValue({
              ...inputValue,
              experience: e.target.value,
            });
          }}
        />
        <label className="input-label">
          {" "}
          <span style={{ color: "red", fontSize: "18px" }}>*</span>Category :
        </label>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          value={inputValue.category}
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
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
        />
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
          {" "}
          <span style={{ color: "red", fontSize: "18px" }}>*</span>End date:
        </label>
        <Space direction="vertical" size={12}>
          <DatePicker
            defaultValue={dayjs("01/01/2015", dateFormatList[0])}
            format={dateFormatList}
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
          {" "}
          <span style={{ color: "red", fontSize: "18px" }}>*</span>Bio :
        </label>
        <TextArea
          rows={4}
          placeholder="Maxlenth 250 character..............."
          maxLength={250}
          value={inputValue.bio}
          onChange={(e) =>
            setInputValue({ ...inputValue, bio: e.target.value })
          }
        />
      </Modal>
      <div className="job-card-outer-container">
        {jobList?.map((v) => {
          return (
            <div className="jobcard-container">
              <CloseOutlined onClick={() => deleteItem(v.user)} />

              <div className="info-image-container">
                <div className="jobcard-image">
                  <img src="https://bareillycollege.org/wp-content/uploads/2022/09/chris-evans.webp" />
                </div>
                <div className="jobcard-info">
                  <h1 className="user-name">
                    Khushvinder <EditOutlined onClick={() => editItem(v)} />
                  </h1>
                  <p className="job-title">Movie Project</p>
                  <p>
                    publishing and graphic design, Lorem ipsum is a placeholder
                    text commonly used to demonstrate the. Lorem ipsum is a
                    placeholder text commonly used to demonstrate the
                  </p>
                </div>
              </div>

              <div className="job-details">
                <div className="details">
                  Actor
                  <strong>Category</strong>
                </div>
                <div className="details">
                  20
                  <strong>requirement</strong>
                </div>
                <div className="details">
                  20/02/2022
                  <strong>PostedOn</strong>
                </div>
                <div className="details">
                  20/04/2022
                  <strong>Exp</strong>
                </div>
              </div>
              <div className="job-card-footer">
                <button className="massage">Massage</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotFound;
