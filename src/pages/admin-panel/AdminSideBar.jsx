import React from "react";

const AdminSideBar = ({tabs, setActiveTab, activeTab}) => {

  return (
    <div className="admin-tabs">
      {
        tabs.map((tab, idx) => (
          <div 
            className={`${activeTab === idx ? 'selected-tab' : ''} tab-content`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.title}
          </div>
        ))
      }
    </div>
  )
}

export default AdminSideBar;