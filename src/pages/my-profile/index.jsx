import { Col, Row, Spin, Tabs } from 'antd';
import { deleteImgApi, uploadApi } from '../../api/upload';
import { getUserApi, updateUserApi, updateThumbnailsApi } from '../../api/user';
import React, { useEffect, useState, useContext } from 'react';
import { mapStates, mapCities } from '../../common/utils';
import { FiltersContext } from '../../App';
import BasicInfo from './basicInfo/BasicInfo';
import Projects from './projectDetails/Projects';
import MyImages from './gallery/MyImages';
import './my-profile.less';


const MyProfile = () => {
  const userId = localStorage.getItem('user');
  const [userDetails, setUserDetails] = useState({});
  const getActiveTab = localStorage.getItem('activeTab');
  const [activeTab, setActiveTab] = useState(getActiveTab || 1);
  const [location, setLocation] = useState(undefined);
  const [isloading, setIsloading] = useState(false);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);
  const [files, setFiles] = useState({});
	const { states } = useContext(FiltersContext)

  const getUserDetails = async () => {
    setIsloading(true);
		const data = await getUserApi(userId).then((data) => {
      setIsloading(false);
      return data
    });
    const {
      thumbnails, projects, ...rest
    } = data;

		setUserDetails({thumbnails, projects, rest});
	}

  useEffect(() => {
    getUserDetails();
  }, [])

  const onChangeRestOptions = (e) => {
    const {
      name, value
    } = e.target;
    const updatedData = {...userDetails, rest: {...userDetails.rest, [name]: value}}
    setUserDetails(updatedData);
  }

  const updateBasicDetails = async () => {
    setIsloading(true)
    await updateUserApi(userId, userDetails?.rest).then(() => {
      setIsloading(false);
    })
  }

	useEffect(() => {
		const data = mapStates(states)
		setLocation(data);
	},[states])

	useEffect(() => {
		if(selectedState) {
			const cities = mapCities(states, selectedState)
			setCities(cities);
		}
	},[selectedState])

  // images handling
  const handleUploadChange = (file) => {
    setFiles(file);
  };

  const uploadThumbnail = async() => {
    setIsloading(true);
    var fd = new FormData();
    fd.append('imgUploader', files);
    const loginResponse = await uploadApi(userId, fd);
    if (!userDetails.thumbnails.length) {
      const thumbnails =  [...userDetails.thumbnails, {url: loginResponse, dp: true, createdAt: new Date()}]
      updateThumbnailsApi(userId, thumbnails).then(() => {
        setIsloading(false);
      });
      setUserDetails({...userDetails, thumbnails})
      setFiles({})
      return
    }
    const thumbnails =  [...userDetails.thumbnails, {url: loginResponse, dp: false, createdAt: new Date()}]
    updateThumbnailsApi(userId, thumbnails).then(() => {
      setIsloading(false);
    });
    setFiles({})
    setUserDetails({...userDetails, thumbnails})
  };

  const makeDp = (index) => {
    setIsloading(true);
    const newArray = userDetails?.thumbnails?.map((img, idx) => (
      idx === index 
        ? {...img, dp: true}
        : {...img, dp: false}
    ))
    updateThumbnailsApi(userId, newArray).then(() => {
      setIsloading(false);
    });
    setUserDetails({...userDetails, thumbnails: newArray})
  }

  const removePic = async(index, url) => {
    setIsloading(true);
    const res = await deleteImgApi({url});
    if (res.success) {
      const filteredArray = userDetails?.thumbnails?.filter((thumbnail, idx) => index !== idx);
      const checkIdDPExist = filteredArray.find((image) => image.dp)
      if (!checkIdDPExist) {
        const newData = filteredArray.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt) })
        const dataToSend = newData?.map((img, idx) => (
          idx === 0 
            ? {...img, dp: true}
            : {...img, dp: false}
        ))
        setUserDetails({...userDetails, thumbnails: dataToSend})
        return updateThumbnailsApi(userId, dataToSend).then(() => {
          setIsloading(false);
          getUserDetails();
        });

      } 
      setUserDetails({...userDetails, thumbnails: filteredArray})
      updateThumbnailsApi(userId, filteredArray).then(() => {
        setIsloading(false);
        getUserDetails();
      });
    }  
  }

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab])

  const taboOnChange = (e) => {
    setActiveTab(e)
  }


  return (
    <Spin spinning={isloading}>
      <div className="info-container">
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey={activeTab} onChange={taboOnChange}>
            <Tabs.TabPane tab="Basic Details" key="1">
              <BasicInfo
                userDetails={userDetails}
                onChangeRestOptions={onChangeRestOptions}
                setUserDetails={setUserDetails}
                updateBasicDetails={updateBasicDetails}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Project Details" key="2">
              <Projects />
            </Tabs.TabPane>
            <Tabs.TabPane tab="my gallery" key="3">
              <MyImages
                userDetails={userDetails}
                makeDp={makeDp}
                removePic={removePic}
                handleUploadChange={handleUploadChange}
                uploadThumbnail={uploadThumbnail}
                files={files}
              />
            </Tabs.TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

export default MyProfile;