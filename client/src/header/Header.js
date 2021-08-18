import React, { useContext, useState } from 'react'
import {
	PageHeader,
	Row,
	Statistic,
	Button,
	Modal,
	Popconfirm,
	Avatar,
} from 'antd'
import styled from 'styled-components'
import { GlobalContext } from '../contexts/AppContext'
import ExpenseInput from '../inputs/ExpenseInput'
import { Link } from 'react-router-dom'

export default function Header() {
	const {
		balance,
		totalIncome,
		totalExpense,
		item,
		setItem,
		keyTab,
		logout,
		user,
	} = useContext(GlobalContext)
	const avatar = (
		<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}>
			{user.name[0].toUpperCase()}
		</Avatar>
	)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const showModal = () => {
		setIsModalVisible(true)
		setItem(prev => {
			return { ...prev, added: true, success: false, error: false }
		})
	}
	const handleCancel = () => {
		setIsModalVisible(false)
		setItem(prev => {
			return { ...prev, added: false }
		})
	}

	function confirm() {
		logout()
	}
	const content = (
		<div>
			<Row style={{ marginBottom: '1rem' }}>
				<Statistic
					title='Balance'
					suffix={item.loading ? null : 'K'}
					value={balance}
					valueStyle={{ color: '#1285FF', fontSize: '1rem' }}
					key='1'
				/>
				<Statistic
					title={keyTab === '1' ? 'Total Income' : 'This Month'}
					value={totalIncome}
					valueStyle={{ color: '#3f8600', fontSize: '1rem' }}
					suffix={item.loading ? null : 'K'}
					key='2'
					style={{
						margin: '0 40px',
					}}
				/>
				<Statistic
					title={keyTab === '1' ? 'Total Expense' : 'This Month'}
					value={totalExpense}
					valueStyle={{ color: '#cf1322', fontSize: '1rem' }}
					suffix={item.loading ? null : 'K'}
					key='3'
				/>
			</Row>

			{/* <Row>
				<Link to='/'>Home</Link>
				<Link
					style={{
						margin: '0 32px',
					}}
					to='/auth'
				>
					Authenticate
				</Link>
			</Row> */}
		</div>
	)
	return (
		<HeaderContainer>
			<PageHeader
				className='site-page-header'
				title={`Welcome ${user?.name}`}
				subTitle='My Money'
				extra={
					<>
						<Button
							type='primary'
							onClick={showModal}
							disabled={item.loading}
						>
							Add Item
						</Button>
						<Popconfirm
							placement='bottom'
							title='Loggin out?'
							onConfirm={confirm}
							onCancel={() => {}}
							okText='Log out'
							cancelText='Cancel'
						>
							<Button type='default' disabled={item.loading}>
								Log out
							</Button>
						</Popconfirm>
					</>
				}
				avatar={{
					src: avatar,
				}}
			>
				<div>{content}</div>
			</PageHeader>
			<Modal
				title='Add New Transaction'
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<ExpenseInput />
			</Modal>
		</HeaderContainer>
	)
}

const HeaderContainer = styled.div``
