import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const GlobalContext = createContext()
const { Provider } = GlobalContext

export default function AppContext({children}) {
    const [item, setItem] = useState({count:0, data: [], success: false, loading: true, added: true})
    const [tempId, setTempId] = useState('')
    const [oldTransaction, setOldTransaction] = useState(null)
    const [balance, setBalance] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [date, setDate] = useState('')
    const [isUpdated, setIsUpdated] = useState({loading: false, success: false, error: false})

    useEffect(() => {
        getTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        calBalance()
        calTransaction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[item])

    console.log('item', item)
    // get all transactions from server:
    async function getTransactions(){
        try {
            const res = await axios.get('api/v1/transactions')
            setItem(res.data)
        } catch(err) {
            console.log(err)
        }
    }
    
    // add new transaction
    async function addItem(newItem){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const response = await axios.post('api/v1/transactions', newItem, config)
            console.log('add res',response)
            const res = response.data
            setItem(prev => {
             return  {...prev,added:res.added, success: res.success, loading: res.loading, count: item.count + 1, data: [res.data, ...item.data]}
            })
        } catch(err){
            console.log(err)
        }
    }
    // delete transaction
    async function deleteItem(itemId){
        try {
            await axios.delete(`api/v1/transactions/${itemId}`)
            setItem(prev => {
                return {...prev, data: item.data.filter(each => each._id !== itemId)}
            })
        } catch(error){
            console.log(error)
        }
    }
    // update transaction
    async function updateItem(itemId, newItem){
        
        try {
            const response = await axios.put(`api/v1/transactions/${itemId}`, newItem)
            console.log('update response', response)
            //getTransactions()
            setIsUpdated(response.data)
            setTempId('')
        } catch(error){
            console.log('update error', error)
            setIsUpdated({loading: false, success: false, error: true})
            setTempId('')
        }
    }
    // calculate balance
    function calBalance() {
        if(item.count) {
            const all = item.data.map(each => parseInt(each.amount, 10))
            const total =  all.reduce((total, each) => total + each, 0)
            setBalance(total)
            
        }
        
        //console.log('allExp',allExp)
    }
    // calculate all expenses and icome
    function calTransaction() {
        if(item.count) {
            const all = item.data.map(each => parseInt(each.amount, 10))
            const allExpense = all.filter(num => num < 0)
            const allIncome = all.filter(num => num >= 0)
            const totalIncome =  allIncome.reduce((total, each) => total + each, 0)
            const totalExpense =  allExpense.reduce((total, each) => total + each, 0)
            
            setTotalExpense(totalExpense)
            setTotalIncome(totalIncome)
           
        }
    }

    return (
        <Provider value={{
            getTransactions,
            item,
            setItem,
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
            setIsUpdated
        }}>
            {children}
        </Provider>
    )
}
