import React from 'react'
import DashboardTemplate from '../../templates/cms/DashboardTemplate'
import { useAuth } from '../../../context/AuthContext';

const Dashboard = () => {
  const {user}= useAuth();

  return (
    <DashboardTemplate>
      <div>
        <h1 className='text-xl'>Halo, {user.email}</h1>
      </div>
    </DashboardTemplate>
  )
}

export default Dashboard