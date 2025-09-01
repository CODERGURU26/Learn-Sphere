'use client'
import React, { useState } from 'react'
import { Card, Button,  Divider, Form, Input, InputNumber, Upload, Drawer, message, Skeleton } from 'antd'
import {  ArrowRightOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import '@ant-design/v5-patch-for-react-19';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import useSWR, { mutate } from 'swr';
import fetcher from '../../lib/fetcher';
import getPrice from '../../lib/get-price';
import Link from 'next/link';

const desc = "This course is a comprehensive, structured, and practical learning program designed to equip students with the fundamental concepts, advanced knowledge, and hands-on skills required to excel in the chosen subject area, beginning with a clear introduction to the basics and gradually progressing toward in-depth analysis of key topics, integrating both theoretical frameworks and practical applications to ensure a well-rounded understanding, offering interactive lectures, real-world case studies, guided projects, and engaging assessments that foster critical thinking, problem-solving, and innovation, while simultaneously developing communication, collaboration, and technical expertise through peer discussions, group work, and instructor feedback, emphasizing not only the mastery of subject-specific knowledge but also the ability to apply concepts in professional and real-life scenarios, preparing learners for higher education, research opportunities, industry roles, and entrepreneurial ventures, enriched with up-to-date content, modern tools, and industry-aligned curriculum that reflects current trends and future demands, while also encouraging creativity, adaptability, and lifelong learning, making it ideal for beginners seeking strong foundations, intermediate learners aiming for growth, and advanced participants desiring specialization, ultimately ensuring that by the end of the course, students are confident, skilled, and capable of leveraging their learning to achieve academic, professional, and personal success."

const Courses = () => {
  const [courseForm] = useForm()
  const [open , setOpen] = useState(false)
  const {data , error , isLoading} = useSWR("/api/course" , fetcher)
  const createCourse = async (value)=>{
    try{
      value.thumbnail =  value.thumbnail.file.originFileObj
      const formData = new FormData()
      formData.append('title', value.title)
      formData.append('description' , value.description)
      formData.append('price' , value.price)
      formData.append('discount',value.discount)
      formData.append('thumbnail', value.thumbnail)

      await  axios.post("/api/course", formData)
      mutate("/api/course")
      handleClose()
    }
    catch(err){
      message.error(err.message)
    }
  }

  const handleClose = ()=>{
    setOpen(false)
    courseForm.resetFields()
  }

  if(isLoading)
  {
    return <Skeleton active />
  }

  if(error)
  {
    return <h1 className='text-xl font-semibold font-serif text-red-500'>{error.message}</h1>
  }
  return (
    <div>
      
      <Card className='!bg-gray-50'>
        <div className='flex justify-between '>
          <input type="text" className='w-[750px] p-2 border  rounded-[10px] font-serif ' size='large' placeholder='Search Your Course Here' />
          <Button onClick={()=>setOpen(true)} size='large' icon={<PlusOutlined />} type='primary' className='!rounded-[10px] px-3 py-2 !bg-blue-500 !font-semibold  text-white !font-serif'>Add Course</Button>
        </div>
        <Divider />
        <div className='grid grid-cols-3 gap-5'>
            {
              data.map((item , index)=>{
                  return(
                    <Link key={index} href={`/admin/courses/${item.title.split(" ").join("-")}?id=${item._id}`}>
                        <Card 
                    cover={<img src={item.thumbnail}/>}
                    > 
                      <Card.Meta 
                      title={<h1 className='text-lg capitalize font-serif'>{item.title}</h1>}
                      description={
                      <div className='space-x-2'>
                        <p className='font-serif'>{item.description.slice(0,80)+"..."}</p>
                        <del className='text-red-400 font-semibold font-serif '>{item.price.toLocaleString()}$</del>
                        <label className='font-serif font-bold text-blue-500'>{getPrice(item.price , item.discount).toLocaleString()}$</label>
                        <label className='text-green-400 font-semibold font-serif'>({item.discount} % Off)</label>
                      </div>
                    }
                    
                      />
                    </Card>
                    </Link>
                  
                  )                
              })
            }
        </div>
      </Card>
      
      <Drawer centered open={open} footer={null} title={<h1 className='text-lg font-serif'>Add Your Course</h1>} width={720} onClose={handleClose}>
        <Divider />
        <Form layout='vertical' onFinish={createCourse} form={courseForm} initialValues={{
          description : desc
        }}>
          <div>
            <Form.Item label="Course's Name" name='title' rules={[{ required: true }]}>
              <Input size='large' placeholder='React Course' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Form.Item label="Price" name='price' rules={[{ required: true, type: Number }]}>
              <InputNumber size='large' placeholder='00.00' className='!w-full' />
            </Form.Item>
            <Form.Item label="Discount" name='discount'>
              <InputNumber size='large' type='number' placeholder='15' className='!w-full' />
            </Form.Item>
          </div>
          <Form.Item label="Description" name='description' rules={[{ required: true }]}>
            <Input.TextArea rows={5} placeholder="Description Goes Here..." />
          </Form.Item>

          <Form.Item label='Thumbnail' name='thumbnail' rules={[{ required: true }]}>
            <Upload style={{ width: '100%' }} fileList={[]}>
              <Card>
                <div className='flex items-center gap-5'>
                  <UploadOutlined className=' text-xl font-serif font-semibold'/>
                  <Card.Meta title="Choose Thumbnail" />
                </div>
              </Card>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button htmlType='submit' type='primary' size='large' className='!font-serif !font-semibold' danger icon={<ArrowRightOutlined className='font-semibold text-lg'/>}>Create</Button>
          </Form.Item>
        </Form>
      </Drawer>

    </div>
  )
}

export default Courses