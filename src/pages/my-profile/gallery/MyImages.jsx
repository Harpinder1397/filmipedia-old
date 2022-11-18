import { UploadOutlined } from '@ant-design/icons';
import { Row, Col, Button, Upload } from 'antd';
import ImageUploaderComponent from '../../../common/image-uploader';

const MyImages = ({
  userDetails,
  makeDp,
  removePic,
  handleUploadChange,
  uploadThumbnail,
  files
}) => {

  console.log('files', files);
  return (
    <>
     <Row justify="center">
        <div className="content">
          {
            files?.name ?
            <div>
              <img src={files?.name && URL.createObjectURL(files)} width={250} height={250}/>
            </div> : null
          }
          
          <div className="uploader-container">
            <ImageUploaderComponent
              // title="Upload New Avatar"
              onChange={handleUploadChange}
              allowedSize={200000}
              // setErrorMsg= {setErrorMsg}
              files={files}
            />

          {
            files?.name ?
            <Button onClick={uploadThumbnail}>Save</Button> : null
          }
          
           
          </div>
        </div>
      </Row>
      <Row gutter={[24, 24]}>
        {
          userDetails?.thumbnails?.map((thumbnail, index) => (
            // <div className="uploaded-container">
              <Col span={4}>
                <div className="uploaded-container">
                  <div className="title">{thumbnail.dp ? 'Current DP' : ''}</div>
                  <img src={thumbnail.url} width={'100%'} />
                  {/* <Button>tags</Button> */}
                  <div className="action-btn">
                    {
                      thumbnail.dp ? null : <Button onClick={() => makeDp(index)}>Make it DP</Button>
                    }
                    <Button onClick={() => removePic(index, thumbnail.url)}>Delete</Button>
                  </div>
                </div>
              </Col>
            // </div>
          ))
        }  
        </Row>
    </>
  )
}

export default MyImages;