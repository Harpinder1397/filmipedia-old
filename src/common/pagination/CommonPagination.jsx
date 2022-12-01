import React from 'react';
import { Pagination } from 'antd';

// const onShowSizeChange = (current, pageSize) => {
//   console.log(current, pageSize, 'gfggfg');
// };

const CommonPagination = ({onShowSizeChange, total}) => {
    return (
    <Pagination
      showSizeChanger={false}
      onChange={onShowSizeChange}
    //   onShowSizeChange={onShowSizeChange}
    //   defaultCurrent={1}
    // pageSizeOptions={20}
    pageSize={9}
      total={total}
    />
    )
    };
export default CommonPagination;