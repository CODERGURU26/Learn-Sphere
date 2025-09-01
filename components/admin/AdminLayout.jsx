'use client'
import React from 'react'
import { Button, Card, Layout, Menu } from 'antd'
import { DashboardOutlined, HomeOutlined, LogoutOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import '@ant-design/v5-patch-for-react-19';
import { usePathname, useRouter } from 'next/navigation'

const { Header, Sider, Content } = Layout

const menus = [
  {
    icon: <DashboardOutlined className='!text-2xl' />,
    label: <Link href='/admin'>Dashboard</Link>,
    key: 'dashboard'
  },
  {
    icon: <ReadOutlined className='!text-2xl' />,
    label: <Link href="/admin/courses">Courses</Link>,
    key: 'courses'
  },
  {
    icon: <LogoutOutlined className='!text-2xl' />,
    label: 'Logout',
    key: 'logout'
  }
]

const AdminLayout = ({ children }) => {
  const pathName = usePathname()
  const router = useRouter()

  // highlight active sidebar item
  const currentKey = pathName.includes("courses")
    ? "courses"
    : pathName === "/admin" ? "dashboard" : ""

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      console.log("Logging out...")
      // here you can clear auth and redirect
      router.push("/")
    }
  }

  const formatTitle = (path) => {
    if (path === "/admin") return "Dashboard"
    const last = path.split("/").pop().replace(/-/g, " ")
    return last.charAt(0).toUpperCase() + last.slice(1)
  }

  return (
    <Layout className='!min-h-screen'>

      {/* Sidebar */}
      <Sider width={260} theme='light' className='!bg-blue-500'>
        <Menu
          items={menus}
          mode='inline'
          selectedKeys={[currentKey]}
          onClick={handleMenuClick}
          className='!bg-gradient-to-r from-rose-400 to-orange-400 !min-h-screen font-bold !font-serif !text-lg
                     [&_.ant-menu-item]:!text-white
                     [&_.ant-menu-item]:!h-14
                     [&_.ant-menu-item]:!flex
                     [&_.ant-menu-item]:!items-center
                     [&_.ant-menu-item:hover]:!bg-rose-600 !transition-all !duration-500
                     [&_.ant-menu-item-selected]:!bg-blue-700'
        />
      </Sider>

      <Layout>
        {/* Navbar */}
        <Header className="!bg-white !px-6 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold text-blue-600">Learn Sphere Admin</h2>

          <div className="flex items-center gap-4">
            {/* Go Home Button */}
            <Link href="/">
              <Button icon={<HomeOutlined/>} type="primary" className="!bg-blue-600 !rounded-xl">
                Go Home
              </Button>
            </Link>

            {/* User Info */}
            <UserOutlined className="text-2xl text-gray-600" />
            <span className="font-semibold">Admin User</span>
          </div>
        </Header>

        {/* Main Content */}
        <Content className='p-8 min-h-screen bg-gray-50'>
          <Card
            title={<h1 className='text-2xl font-semibold font-serif'>{formatTitle(pathName)}</h1>}
            className='min-h-screen shadow-md'
          >
            {children}
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
