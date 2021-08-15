import React, {useContext} from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { GlobalContext } from '../contexts/AppContext'
import { useHistory } from 'react-router'



export default function Auth() {
    const history = useHistory()
    const {signIn} = useContext(GlobalContext)

	const onFinish = async (values) => {
		console.log('Success:', values)
        signIn(values, history)
       
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div style={{ padding: '10px' }}>
			<Form
				name='basic'
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 8,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Email'
					name='email'
					rules={[
						{
							required: true,
							message: 'invalid email!',
                            type: 'email'

						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type='primary' htmlType='submit'>
						Sign in
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
