import React from 'react'
import { HeartFilled, HeartOutlined, VerifiedOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import defaultThumbnail from '../../assets/images/avatar.png'
import './commonCard.less';

const CommonCard = ({user, favList, isFav, handleFavourite, handleRemoveFavourite}) => {
  // const userId = localStorage.getItem('user');
  // const token = localStorage.getItem('token');


  // const handleFavourite = async (userInfo) => {
  //     if(!token) return history.push('/signin')
  //     const payload = {
  //         userId: userId,
  //         favUserId: userInfo._id,
  //         favName: userInfo?.fullName || '',
  //         favSubCategory: userInfo?.subCategory || '',
  //         favThumbnail: userInfo.thumbnails?.find((thumbnail) => thumbnail.dp)?.url || ''
  //     }
  //     addToFavouritesApi(payload);
  // }

  // const handleRemoveFavourite = async (id) => {
  //   if(!token) return history.push('/signin')
  //   removeFromFavouritesApi(userId, id);
  // }

  const handleNavigationUser = () => {
    history.push(`/profile/${user?.favUserId || user?._id}`)

    // if(userId && token) {
    //   history.push(`/profile/${user.favUserId || user._id}`)
    // } else {
    //   history.push(`/signin`)
    // } 
  }

  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
console.log(user.favUserId, user._id, 'user')

  const history = useHistory();
  return (
    <div className="card-container">
      <div className="img-wrapper">
        <img src={isFav ? (user.favThumbnail || defaultThumbnail) : (user.thumbnails?.find((thumbnail) => thumbnail.dp)?.url || defaultThumbnail)} alt="dp" />
      </div>
      <div className='d-flex flex-col details'>
        <div>
          <div className="cursor-pointer" onClick={() => handleNavigationUser()}>
              {user.fullName || user.favName}
          </div>
          <div className="sub-cat">
              {user.subCategory || user.favSubCategory}
          </div>
          <div className="meta">
            {user.experience ? `${user.experience} years` : '3 years'}
          </div>
          <div className="meta">
            Available
          </div>
        </div>
        
        <div className="action-btns">
          {user?.verified ? <VerifiedOutlined style={{ color: 'green'}} /> : <VerifiedOutlined />}
          {
            isFav || favList?.find((fav) => user._id === fav.favUserId)
            ? <HeartFilled style={{ color: 'red'}} onClick={() => handleRemoveFavourite(user.favUserId || user._id)}/>
            : <HeartOutlined onClick={() => handleFavourite(user)}/>
          }
        {/* </div> */}
        </div>
      </div>
     
    </div>
  )
}

export default CommonCard;