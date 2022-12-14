import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Form, Input, Button, Select, DatePicker, Spin, Alert, message } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'


const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 7,
    span: 16,
  },
};

export default function ExpenseInput() {
  
  function onChange(date) {
    if(date) {
      let tempDate = date._d.toString().replace("GMT+0700 (Indochina Time)", "").split(' ').splice(0, 4).join(' ')  ;
      setDate(tempDate)
  }
    
}

  const { addItem, date, setDate, item ,setItem, categories } = useContext(GlobalContext)

  const [form] = Form.useForm();

  const infoSuccess = () => {
    message.success('The transaction has been added!');
  };

  const infoError = () => {
    message.error('Something went wrong, check again!');
  };
  useEffect(() => {
    if(item.success && item.added) {
      infoSuccess()
    } else if(item.error) {
      infoError()
    }
  },[item.success, item.error, item.added])
  
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    setItem(prev => {
      return {...prev, added: false,  error: false}
    })
    console.log(values)
    values.date = date
    //handleCancel()
    if(values.category === 'create new category'){
      values.category = values.newcategory
    }
    addItem(values)
    onReset()
  };
  return (
    <div style={{position: 'relative'}}>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
       
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Enter name"/>
      </Form.Item>
      <Form.Item
        name="amount"
        label="(+/-) Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="positive / negative amount" />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        
        rules={[
          {
            required: true,
          },
        ]}
      >
         <DatePicker onChange={onChange}/>
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a category"
          allowClear
        >
          {categories.map(each => {
           return <Option key={each} value={each}>{each}</Option>
         })}
          <Option value="create new category"><PlusCircleOutlined style={{color: '#1285FF'}}/> New Category</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.category !== currentValues.category}
      >
        {({ getFieldValue }) => {
          return getFieldValue("category") === "create new category" ? (
            <Form.Item
              name="newcategory"
              label="New Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter new Category"/>
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
     
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" size='large' disabled={!item.added} loading={!item.added}>
          Add Transaction
        </Button>
      </Form.Item>
    </Form>
     {item.error && <Alert message="Something went wrong, please check again" type="error" />}
    </div>
  );
}
