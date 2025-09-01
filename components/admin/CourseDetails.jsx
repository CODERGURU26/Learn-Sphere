'use client'
import { ArrowRightOutlined, DeleteOutlined, SearchOutlined, UploadOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Drawer, Form, Input, List, message, Skeleton, Upload } from 'antd'
import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import fetcher from '../../lib/fetcher';

const CourseDetails = () => {
  const[videoForm] = Form.useForm()
  const [open, setOpen] = useState(false)
  const params = useSearchParams()
  const courseId = params.get("id")
  const router = useRouter()
  const {data , error , isLoading} = useSWR(courseId ? `/api/video/${courseId}`:null 
    , courseId ? fetcher : null)

  useEffect(() => {
    if (!courseId) {
      return router.push("/admin/courses")
    }
  }, [courseId])

  const addVideo = (value) => {
    const formData = new FormData()
    const video = value.video.file.originFileObj
    const url = URL.createObjectURL(video)
    const videoTag = document.createElement("video")
    videoTag.src = url
    videoTag.preload = "metadata"
    videoTag.load()
    videoTag.onloadedmetadata = async () => {

      try {
        formData.append("title", value.title)
        formData.append("duration", videoTag.duration)
        formData.append("size", video.size)
        formData.append("courseId", courseId)
        formData.append("video", video)
        await axios.post("/api/video",formData)
        mutate(`/api/video/${courseId}`)
        message.success("Video Added Successfully")
        handleClose()
      }
      catch (err) {
        message.error(err.message)
      }
    }
  }
  const handleClose = () => {
    setOpen(false)
    videoForm.resetFields()
  }

  const deleteVideo = async(id)=>{
    await axios.delete(`/api/video/${id}`)
    mutate(`/api/video/${courseId}`)
  }

  if(isLoading)
    return <Skeleton active/>

  if(error)
    return <h1 className='font-medium font-serif text-red-500'>{error.message}</h1>

  return (
    <div>
      <div className='flex gap-5'>
        <Input size='large' placeholder='Search' />
        <Button
          icon={<VideoCameraAddOutlined className='text-base !font-bold' />}
          type='primary'
          size='large'
          onClick={() => setOpen(true)}
          className='!font-serif !font-bold !text-white !bg-indigo-500'>
          Add Lesson</Button>
      </div>
      <Divider />
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button icon={<DeleteOutlined className='!font-bold' />}
                  type='primary' danger
                  className='!font-bold !font-serif'
                  onClick={()=>deleteVideo(item._id)}
                >Delete</Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar className='!bg-orange-500' icon={<VideoCameraOutlined />}></Avatar>}
                title={<a className='font-serif font-semibold'>{item.title[0].toUpperCase()}{item.title.slice(1).toLowerCase()}</a>}
                description={
                  <div className='space-x-3'>
                    <label className='font-serif text-blue-500'>Duration : {(item.duration/60).toFixed(1)}Min</label>
                    <label className='font-serif text-orange-500'>Size : {(item.size/1000/1000).toFixed(1)}Mb</label>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Drawer open={open} width={600} title="Add A New Video Lesson" onClose={handleClose}>
        <Form form={videoForm} layout='vertical' onFinish={addVideo}>
          <Form.Item label="Video's Name" name="title" rules={[{ required: true }]}>
            <Input size='large' placeholder='Enter Video Lesson' />
          </Form.Item>

          <Form.Item label="Video" name="video" rules={[{ required: true }]}>
            <Upload style={{ width: "100%" }} fileList={[]}>
              <div className='border border-gray-200 flex items-center justify-center flex-col rounded-xl p-12'>
                <UploadOutlined className='text-4xl' />
                <h1 className='text-lg font-serif font-medium'>Choose Video</h1>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button icon={<ArrowRightOutlined />} danger size='large' htmlType='submit' type='primary'>Create</Button>
          </Form.Item>
        </Form>
      </Drawer>

    </div>
  )
}

export default CourseDetails