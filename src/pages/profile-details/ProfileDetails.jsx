import { Row, Col, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import './profileDetails.less';
// import Thumbnail from 'assets/images/dummy.png'
import { CheckCircleFilled } from '@ant-design/icons';
import { getUserApi } from '../../api/user';
import { useParams } from 'react-router';

const renderTabData = (tab) => {
	switch (tab) {
		case 1:
			return 'About';
		case 2:
			return 'Links';
		case 3:
			return 'Portfolio';
		default:
			return 'About';
	}
}
const ProfileDetails = () => {
	const [activeTab, setActiveTab] = useState(1);

	const [userDetails, setUserDetails] = useState();

	const { id } = useParams();
	
	useEffect(() => {
		getUserDetails();
	}, [])

	const getUserDetails = async () => {
		const data = await getUserApi(id);
		console.log('data', data)
		setUserDetails(data);
	}


	return (
		<div className="profile-details-container">
			<Row>
				<Col span={6}>
					<div className="side-bar-details">
						<div className="img-holder">
							<img src={userDetails?.thumbnails?.find((thumbnail) => thumbnail.dp)?.url} alt="profile-pic" />
						</div>
						<div className="meta-details-container">
							<div className="meta-details">
								<div className="title">
									<CheckCircleFilled style={{ color: 'green' }} /> <span>{userDetails?.userName}</span>
								</div>
								<div className="designation">
									<span>{userDetails?.category}</span>
								</div>

								<div className="bottom-info">
									<div className="info-container">
										<div className="location-label">
											<span>{userDetails?.city}</span>
										</div>
										<div className="location-name">
											<span>{userDetails?.state}</span>
										</div>
									</div>
									<div className="info-container">
										<div className="profile-visit-label">
											<span>Profile Vists</span>
										</div>
										<div className="profile-visit-count">
											50
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Col>
				<Col span={18}>
					<div className="full-details-container">
						<div className="full-details-header">
							<div className="cursor-pointer" onClick={() => setActiveTab(1)}>
								About
							</div>
							<div className="vertical-line">
							</div>
							<div className="cursor-pointer" onClick={() => setActiveTab(2)}>
								Links
							</div>
							<div className="vertical-line">
							</div>
							<div className="cursor-pointer" onClick={() => setActiveTab(3)}>
								Portfolio
							</div>
						</div>
						<div className="full-details">
							{renderTabData(activeTab)}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default ProfileDetails