'use client'
import { Avatar, Card, Skeleton } from 'antd'
import React from 'react'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'
import { ClockCircleOutlined, DatabaseOutlined, ReadOutlined, VideoCameraOutlined } from '@ant-design/icons'

const DashBoard = () => {
  const {data , error , isLoading} = useSWR("/api/dashboard" , fetcher)
  
  if(isLoading)
    return <Skeleton active/>

  if(error)
    return <h1 className='font-serif text-2xl font-semibold text-red-500'>{error.message}</h1>
  return (
    <div className='grid grid-cols-3 gap-8'>
        <Card>
          <div className='flex items-center gap-5'>
            <Avatar 
            className='!w-20 !h-20 !bg-orange-500' 
            icon={<VideoCameraOutlined className='text-4xl'/>} />

            <div className='flex gap-2 items-center'>
              <h1 className='text-xl font-semibold font-serif'>Total Videos:</h1>
              <p className='text-4xl font-semibold font-serif'>{data.totalVideos}</p>
            </div>
          </div>
          
        </Card>

         <Card>
          <div className='flex items-center gap-5'>
            <Avatar 
            className='!w-20 !h-20 !bg-orange-500' 
            icon={<ReadOutlined className='text-5xl'/>} />

            <div className='flex gap-2 items-center'>
              <h1 className='text-xl font-semibold font-serif'>Total Courses:</h1>
              <p className='text-4xl font-semibold font-serif'>{data.totalCourse}</p>
            </div>
          </div>
          
        </Card>

         <Card>
          <div className='flex items-center gap-5'>
            <Avatar 
            className='!w-20 !h-20 !bg-orange-500' 
            icon={<ClockCircleOutlined className='text-5xl'/>} />

            <div className='items-center'>
              <h1 className='text-xl font-semibold font-serif'>Total Hours:</h1>
              <p className='text-4xl font-semibold font-serif'>{data.totalVideosHour}</p>
            </div>
          </div>
          
        </Card>
        
         <Card>
          <div className='flex items-center gap-5'>
            <Avatar 
            className='!w-20 !h-20 !bg-orange-500' 
            icon={<DatabaseOutlined className='text-5xl'/>} />

            <div className='items-center'>
              <h1 className='text-2xl font-semibold font-serif'>Memory Used:</h1>
              <p className='text-4xl font-semibold font-serif'>{data.memoryUsed}</p>
            </div>
          </div>
          
        </Card>
    </div>
  )
}

export default DashBoard