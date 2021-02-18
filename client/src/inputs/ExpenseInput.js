import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Form, Input, Button, Select, DatePicker, Spin, Alert } from 'antd'


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

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
        return;
      default: 
        return;
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    setItem(prev => {
      return {...prev, added: false, success: false, error: false}
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
        label="Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Enter amount" />
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
          onChange={onGenderChange}
          allowClear
        >
          {categories.map(each => {
           return <Option key={each} value={each}>{each}</Option>
         })}
          <Option value="create new category">create new category</Option>
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
      {item.success && <Alert style={{marginBottom: '1rem', paddingBottom: 0}} message={<p>The transaction has been added!</p>} type="success" />}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" size='large'>
          Add Transaction
        </Button>
      </Form.Item>
    </Form>
    {!item.added && <Spin style={{position: 'fixed',
                                        top: '50%',
                                        left: '50%',
                                        zIndex: 2,
                                        transform: "translate(-'50%', -'50%')"}}/>
    }
     {item.error && <h4>:(( Something went wrong</h4>}
    </div>
  );
}
