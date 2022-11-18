import React from 'react';
import { Typography, Checkbox } from "antd";
import Item from 'antd/lib/list/Item';

const SubCategoryComponent = ({subCategoryFilter, formData, setFormData, title }) => {
    return (
        <div className="sub-categories-container">
            <div className="title">
                <Typography.Title level={3} style={{color: 'rgba(0, 0, 0, 0.85)'}}>{title}</Typography.Title>
            </div>
            <div className="filter-container">
                {
                    subCategoryFilter.length && subCategoryFilter.map((subCat) =>
                    <Checkbox 
                        kye={subCat.key}
                        name={subCat.name}
                        onChange={(e) => setFormData({...formData, [subCat.objName || subCat.name]: e.target.checked ? e.target.value : '' })} 
                        value={subCat.value}
                        style={{ marginTop: '20px'}}
                    >
                        <span style={{ fontSize: '16px' }}>{subCat.name}</span>
                    </Checkbox>
                    )
                }

            </div>
        </div>
    )
}

export default SubCategoryComponent;