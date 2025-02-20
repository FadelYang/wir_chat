import React from 'react'
import HeaderMenu from '../../organism/cms/HeaderMenu';
import DashboardTemplate from '../../templates/cms/DashboardTemplate';
import UserTable from '../../organism/cms/datatables/UserTable';

const UserMenu = () => {
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "Users", path: "/dashboard/users"},
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={'Users'} breadcrumbPath={breadcrumbPath}/>
      <div className="mt-5">
        <UserTable />
      </div>
    </DashboardTemplate>
  )
}

export default UserMenu