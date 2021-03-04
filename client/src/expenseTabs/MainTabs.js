import React, {useContext, useState} from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Tabs, Spin } from 'antd'
import { DollarOutlined, PoundOutlined } from '@ant-design/icons'
import ItemList from './ItemList'
import ItemContainer from '../itemDisplay/ItemContainer'
import moment from 'moment'
import styled from 'styled-components'

export default function MainTabs({category}) {
    const { TabPane } = Tabs;
    const { item, setItem, getTransactions, freezeBalance, setFreeBalance, keyTab, setKeyTab } = useContext(GlobalContext)
    const allItem = item.data.filter(each => each.category === category)
    const month = moment().format("MMM")
    const year = moment().format("YYYY")
    
   async function getMonth() {
        const allArray = item.data
        const thisMonth = allArray.filter(item => item.date.includes(month) && item.date.includes(year))
        setFreeBalance(true)
     await   setItem(prev => {
            return {...prev, data: thisMonth}
        })
        setKeyTab('2')
        
    }

   async function getAll() {
        setFreeBalance(false)
      await  getTransactions()
        
        setKeyTab('1')
    }

    console.log('key', keyTab)
    
    return (
        <Tabs  activeKey={keyTab} size="small" type='card' animated>
            <TabPane
                tab={
                    <span onClick={getAll}>
                    <DollarOutlined />
                    All Time
                    </span>
                }
                key="1"
                >
                    <>{ (category === 'all')?
                        <ItemContainer />
                        :
                        <ItemList item={allItem}/> }</>
                   
                
            </TabPane>
            <TabPane
                tab={
                    <span  onClick={getMonth}>
                    <PoundOutlined />
                    This Month
                    </span>
                }
                key="2"
               
                >
                     <>{(category === 'all')?
                        <ItemContainer />
                        :
                        <ItemList item={allItem}/>}</>
                    
                
            </TabPane>
  </Tabs>
    )
}

const SpinWrapper = styled.div`
 position: relative;
`

const SpinStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`