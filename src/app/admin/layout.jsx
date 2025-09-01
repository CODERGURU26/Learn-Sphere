import React from 'react'
import AdminLayout from '../../../components/admin/AdminLayout'


const AdminLayoutRouter = ({children}) => {
  return (
    <AdminLayout>
        {children}
    </AdminLayout>
  )
}

export default AdminLayoutRouter