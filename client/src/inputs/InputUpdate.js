import React, { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Form, Input, Button, Select, DatePicker, Spin, Alert } from 'antd'
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
    offset: 8,
    span: 16,
  },
};

export default function InputUpdate({old}) {
  
  function onChange(date) {
    if(date) {
      let tempDate = date._d.toString().replace("GMT+0700 (Indochina Time)", "").split(' ').splice(0, 4).join(' ')  ;
      setDate(tempDate)
    }
 }

  const { date, setDate, tempId, updateItem, setOldTransaction, isUpdated, setIsUpdated, categories} = useContext(GlobalContext)
  
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const oldKeys = ['name', 'amount', 'date','category']
    

  const onFinish = (values) => {
    setIsUpdated({loading: true, success: false, error: false})
    if(values.date){
      values.date = date
    }
     oldKeys.map(key => {
         if(!values[key]){
             values[key] = old[key]
         }
         return key
     })
     setOldTransaction(values)
    
    console.log(values)

    
    //handleCancel()
    if(values.category === 'create new category'){
      values.category = values.newcategory
    }
    updateItem(tempId, values)
    
  };

  
  return (
    <div style={{position: 'relative'}}>
      
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input placeholder="Enter name" defaultValue={old.name}/>
      </Form.Item>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input placeholder="Enter amount" defaultValue={old.amount}/>
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        
        rules={[
          {
            required: false,
          },
        ]}
      >
         <DatePicker onChange={onChange} placeholder={old.date}/>
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select
          placeholder="Select a category"
          allowClear
          defaultValue={old.category}
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
      {isUpdated.success && <Alert style={{paddingBottom: 0}} message={<p> The transaction has been updated!</p>} type="success" />}
      <Form.Item {...tailLayout}>
        {!isUpdated.success && 
          <Button type="primary" htmlType="submit" size='medium'>
            Update Transaction
          </Button>
        }
      </Form.Item>
    </Form>
    {isUpdated.loading && <Spin style={{position: 'fixed',
                                        top: '50%',
                                        left: '50%',
                                        zIndex: 2,
                                        transform: "translate(-'50%', -'50%')"}}/>}
    
    {isUpdated.error && <h4>:(( Something went wrong</h4>}
    </div>
  );
}
