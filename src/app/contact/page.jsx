'use client'
import React from "react";
import Link from "next/link";
import { Form, Input, Button, message } from "antd";
import '@ant-design/v5-patch-for-react-19';
import emailjs from "emailjs-com";

const Contact = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
    };

    emailjs
      .send(
        "service_3zc48ee",   // Replace with your EmailJS Service ID
        "template_esgtlvo",  // Replace with your EmailJS Template ID
        templateParams,
        "XkA69SFjQZahOB6Np"    // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          message.success("Your message has been sent!");
          form.resetFields();
        },
        (err) => {
          console.error("FAILED...", err);
          message.error("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Learn Sphere</h1>
        <ul className="flex gap-6">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/admin" className="hover:text-gray-300">Courses</Link></li>
          <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>
      </nav>

      {/* Contact Form */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contact Us</h2>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
            <Form.Item name="name" label="Your Name" rules={[{ required: true, message: "Please enter your name" }]}>
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item name="email" label="Your Email" rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}>
              <Input placeholder="example@email.com" />
            </Form.Item>
            <Form.Item name="message" label="Message" rules={[{ required: true, message: "Please enter your message" }]}>
              <Input.TextArea rows={5} placeholder="Write your message here..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 text-center py-6">
        © {new Date().getFullYear()} Learn Sphere. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
