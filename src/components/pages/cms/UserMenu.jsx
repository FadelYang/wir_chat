import React from 'react'
import HeaderMenu from '../../organism/cms/HeaderMenu';
import DashboardTemplate from '../../templates/cms/DashboardTemplate';

const UserMenu = () => {
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "Users", path: "/dashboard/users"},
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={'Users'} breadcrumbPath={breadcrumbPath}/>
    </DashboardTemplate>
  )
}

export default UserMenu