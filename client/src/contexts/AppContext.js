import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

export const GlobalContext = createContext()
const { Provider } = GlobalContext
let logoutTimer
export default function AppContext({ children }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('moneyUser')) || {})
	const [item, setItem] = useState({
		count: 0,
		data: [],
		success: false,
		loading: true,
		added: true,
		Loading: true,
	})
	const [categories, setCategories] = useState()
	const [tempId, setTempId] = useState('')
	const [oldTransaction, setOldTransaction] = useState(null)
	const [balance, setBalance] = useState(0)
	const [totalIncome, setTotalIncome] = useState(0)
	const [totalExpense, setTotalExpense] = useState(0)
	const [date, setDate] = useState('')
	const [isUpdated, setIsUpdated] = useState({
		loading: false,
		success: false,
		error: false,
	})
	const [freezeBalance, setFreeBalance] = useState(false)
	const [keyTab, setKeyTab] = useState('1')
	const [tokenExpirationDate, setTokenExpirationDate] = useState(null)
	const [signUpSucces, setSignUpSucces] = useState(null)
	const [loginSucces, setLoginSucces] = useState(null)
	const [loginLoading, setLoginLoading] = useState(false)


	useEffect(() => {
		console.log('run logout ???', new Date(user?.expiration) , new Date(), )
		if(!user?.token || new Date(user?.expiration) < new Date()) {
			console.log('user', user)
			logout()
		}
	}, [])

	useEffect(() => {
		if (user?.token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime()
			logoutTimer = setTimeout(logout, remainingTime)
		} else {
			clearTimeout(logoutTimer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.token, tokenExpirationDate])

	useEffect(() => {
		if(user?.token) {
			getTransactions()
		}
	}, [user])

	useEffect(() => {
		calTransaction()
		getCategories()
		if (!freezeBalance) {
			calBalance()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item])

	//signin
	const signIn = async (user, history, experationDate) => {
		setLoginLoading(true)
		const config = {
			headers: {
				'Content-Type': 'application/json'
			},
		}
		//generate the time from login and plus 1 hour
		const tokenExpirationDate = new Date(
			new Date().getTime() + 1000 * 60 * 60
		)
		setTokenExpirationDate(tokenExpirationDate)
		try {
			const { data } = await axios.post('api/users/signin', user, config)
			setUser(data)
			setLoginSucces(true)
			window.localStorage.setItem(
				'moneyUser',
				JSON.stringify({ ...data, expiration: experationDate || tokenExpirationDate.toISOString(), })
			)
			setLoginLoading(false)
			history.push('/')
		} catch (error) {
			console.log(error)
			setLoginSucces(false)
			setLoginLoading(false)
		}
	}

	//google signin
	const googleSignIn = (user, token, history, experationDate) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			},
		}
		//generate the time from login and plus 1 hour
		const tokenExpirationDate = new Date(
			new Date().getTime() + 1000 * 60 * 60
		)
		setTokenExpirationDate(tokenExpirationDate)
		const data = {
			token: token,
			name: user.name,
			email: user.email,
			imageUrl: user.imageUrl,
		}
		setUser(data)
		setLoginSucces(null)
		window.localStorage.setItem(
			'moneyUser',
			JSON.stringify({ ...data, expiration: experationDate || tokenExpirationDate.toISOString(), })
		)
		setLoginLoading(false)
		history.push('/')
	}

	//signup
	const signUp = async (user) => {
		setLoginLoading(true)
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			const { data } = await axios.post('api/users/signup', user, config)
			console.log('signup', data)
			setSignUpSucces(true)
			setLoginLoading(false)
		} catch (error) {
			setLoginLoading(false)
			setSignUpSucces(false)
			console.log(error)
		}
	}

	

	//logout
	const logout = () => {
		setUser({})
		window.localStorage.removeItem('moneyUser')
		setLoginSucces(null)
		setSignUpSucces(null)
		setBalance(0)
		setTotalIncome(0)
		setTotalExpense(0)
		console.log('logout')
	}

	//get all categoris
	function getCategories() {
		const allCategory = item.data.map(each => {
			return each.category
		})
		const uniqueCategory = [...new Set(allCategory)]
		setCategories(uniqueCategory)
	}

	// get all transactions from server:
	async function getTransactions() {
		const config = {
			method: 'get',
			url: 'api/v1/transactions',
			headers: {
				Authorization:
					'Bearer ' + user?.token
			},
		}

		axios(config)
			.then(function (res) {
				setItem({ ...res.data })
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	// add new transaction
	async function addItem(newItem) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + user?.token
			},
		}
		try {
			const response = await axios.post(
				'api/v1/transactions',
				newItem,
				config
			)
			const res = response.data
			setItem(prev => {
				return {
					...prev,
					added: res.added,
					success: res.success,
					loading: res.loading,
					count: item.count + 1,
					data: [res.data, ...item.data],
				}
			})
		} catch (err) {
			console.log(err)

			setItem(prev => {
				return {
					...prev,
					success: false,
					loading: false,
					error: true,
					added: true,
				}
			})
		}
	}

	// delete transaction
	async function deleteItem(itemId) {
		const config = {
			headers: {
				Authorization:
					'Bearer ' + user?.token
			},
		}
		try {
			await axios.delete(`api/v1/transactions/${itemId}`, config)
			setItem(prev => {
				return {
					...prev,
					data: item.data.filter(each => each._id !== itemId),
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	// update transaction
	async function updateItem(itemId, newItem) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + user?.token
			},
		}
		try {
			const response = await axios.put(
				`api/v1/transactions/${itemId}`,
				newItem,
				config
			)
			//getTransactions()
			setIsUpdated(response.data)
			setTempId('')
		} catch (error) {
			console.log('update error', error)
			setIsUpdated({ loading: false, success: false, error: true })
			setTempId('')
		}
	}

	// calculate balance
	function calBalance() {
		if (item.count) {
			const all = item.data.map(each => parseInt(each.amount, 10))
			const total = all.reduce((total, each) => total + each, 0)
			setBalance(total)
		}
	}

	// calculate all expenses and icome
	function calTransaction() {
		if (item.count) {
			const all = item.data.map(each => parseInt(each.amount, 10))
			const allExpense = all.filter(num => num < 0)
			const allIncome = all.filter(num => num >= 0)
			const totalIncome = allIncome.reduce(
				(total, each) => total + each,
				0
			)
			const totalExpense = allExpense.reduce(
				(total, each) => total + each,
				0
			)

			setTotalExpense(totalExpense)
			setTotalIncome(totalIncome)
		}
	}

	return (
		<Provider
			value={{
				signIn,
				googleSignIn,
				logout,
				signUp,
				user,
				signUpSucces,
				loginSucces,
				loginLoading,
				setSignUpSucces,
				setLoginSucces,
				getTransactions,
				item,
				setItem,
				categories,
				addItem,
				totalIncome,
				totalExpense,
				balance,
				setDate,
				date,
				deleteItem,
				updateItem,
				tempId,
				setTempId,
				setOldTransaction,
				oldTransaction,
				isUpdated,
				setIsUpdated,
				freezeBalance,
				setFreeBalance,
				keyTab,
				setKeyTab,
			}}
		>
			{children}
		</Provider>
	)
}
