import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button, message, Card, Typography } from 'antd'
import { GlobalContext } from '../contexts/AppContext'
import { useHistory } from 'react-router'
import { GoogleLogin } from 'react-google-login'
import { DollarOutlined } from '@ant-design/icons'

import styled from 'styled-components'

const { Text, Link, Title } = Typography
export default function Auth() {
	const history = useHistory()
	const {
		signIn,
		googleSignIn,
		signUp,
		signUpSucces,
		loginSucces,
		loginLoading,
		setSignUpSucces,
		setLoginSucces,
	} = useContext(GlobalContext)
	const [isLogin, setIsLogin] = useState(true)
	const [type, setType] = useState({ email: '', password: '' })

	useEffect(() => {
		if (signUpSucces) {
			setIsLogin(true)
			message.success('Sign up successfully!')
			setSignUpSucces(null)
		} else if (signUpSucces === false) {
			message.error('Sign up failed, please check again.')
			setSignUpSucces(null)
		}
	}, [signUpSucces])

	useEffect(() => {
		if (loginSucces) {
			message.success('Logged in!')
			setLoginSucces(null)
		} else if (loginSucces === false) {
			message.error('Log in failed, please try again')
			setLoginSucces(null)
		}
	}, [loginSucces])

	const onFinish = async values => {
		console.log('Success:', values)
		if (isLogin && !signUpSucces) {
		}
		isLogin && signIn(values, history)
		if (!isLogin) {
			signUp(values)
		}
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const googleSuccess = async res => {
		const result = await res?.profileObj
		const token = await res?.tokenId
		console.log('google login success', result, token)
		if (result && token) {
			setLoginSucces(true)
			googleSignIn(result, token, history)
		}
	}

	const googleError = error => {
		setLoginSucces(false)
		console.log('error: ', error)
	}

	return (
		<PageWrapper>
			<TitleWrapper>
				<Title level={2}>Welcome To My Money</Title>
			</TitleWrapper>
			<FormWrapper>
				<CardStyled
					title={
						isLogin ? 'Login to My Money!' : 'Sign up to My Money!'
					}
				//	style={{ width: 600 }}
				>
					<div style={{ textAlign: 'center' }}>
						{isLogin ? (
							<Text strong>
								Enter your email address and password.
							</Text>
						) : (
							<Text strong>
								Sign up with your email and a password.
							</Text>
						)}
					</div>
					<Form
						style={{ marginTop: '20px' }}
						name='basic'
						// labelCol={{
						// 	span: 4,
						// }}
						// wrapperCol={{
						// 	span: 17,
						// }}
						// initialValues={{
						// 	remember: true,
						// }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						{!isLogin && !signUpSucces && (
							<Form.Item
								label='Your Name'
								name='name'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input />
							</Form.Item>
						)}
						<Form.Item
							label='Email'
							name='email'
							rules={[
								{
									required: true,
									message: 'invalid email!',
									type: 'email',
								},
							]}
						>
							<Input
								onChange={e =>
									setType({ ...type, email: e.target.value })
								}
								value={type.email}
							/>
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
							<Input.Password
								onChange={e =>
									setType({ ...type, email: e.target.value })
								}
								value={type.password}
							/>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 10,
								span: 17,
							}}
						>
							<Button
								type='primary'
								htmlType='submit'
								loading={loginLoading}
								disabled={loginLoading}
							>
								{!isLogin ? 'Sign up' : 'Log in'}
							</Button>
						</Form.Item>
					</Form>

					{/* <GoogleLogin
						clientId='764653909373-n0l193hu41uegqllno34q5etp9b5d7qq.apps.googleusercontent.com'
						render={renderProps => (
							<Button
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleError}
						cookiePolicy='single_host_origin'
					/> */}
				</CardStyled>
				<div style={{ textAlign: 'center' }}>
					{isLogin ? (
						<p>
							Don’t have an account yet?{' '}
							<Button
								type='link'
								style={{ padding: 2 }}
								onClick={() => setIsLogin(false)}
							>
								Sign up
							</Button>
						</p>
					) : (
						<p>
							Already have an account?{' '}
							<Button
								type='link'
								style={{ padding: 2 }}
								onClick={() => setIsLogin(true)}
							>
								Login
							</Button>
						</p>
					)}
				</div>
			</FormWrapper>
			<FooterWrapper>
				<p>
					created by
					<a
						href='https://buinam.com'
						target='_blank'
						rel='noreferrer'
					>
						{' '}
						Bui Nam
					</a>
				</p>
			</FooterWrapper>
		</PageWrapper>
	)
}

const PageWrapper = styled.div`
	margin: 0 auto;
	padding-top: 50px;
	display: grid;
	justify-content: center;
	align-content: center;
	justify-items: center;
`

const FormWrapper = styled.div`
	margin-top: 50px;
`

const TitleWrapper = styled.div`
	text-align: center;
`
const FooterWrapper = styled.div`
	margin-top: 1rem;
	position: fixed;
	bottom: -0.5rem;
	width: 100vw;
	background-color: #ffffff;
	padding-bottom: 0;
	text-align: center;
	& a {
		color: #ff4500;
		font-size: 0.7rem;
	}
	& p {
		font-size: 0.7rem;
	}
`
const CardStyled = styled(Card)`
	@media screen and (min-width: 900px) {
		width: 500px;
	}

`