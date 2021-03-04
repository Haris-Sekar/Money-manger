import React, {useContext, useState} from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Tabs, Spin } from 'antd'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons'
import ItemList from './ItemList'
import ItemContainer from '../itemDisplay/ItemContainer'
import moment from 'moment'
import styled from 'styled-components'

export default function MainTabs({category}) {
    const { TabPane } = Tabs;
    const { item, setItem, getTransactions, freezeBalance, setFreeBalance } = useContext(GlobalContext)
    const allItem = item.data.filter(each => each.category === category)
    const month = moment().format("MMM")
    const year = moment().format("YYYY")
    const [defaultKey, setDefaultKey] = useState('1')
    function getMonth() {
        const allArray = item.data
        const thisMonth = allArray.filter(item => item.date.includes(month) && item.date.includes(year))
        setItem(prev => {
            return {...prev, data: thisMonth}
        })
        setDefaultKey('2')
        setFreeBalance(true)
    }

    function getAll() {
        getTransactions()
        setFreeBalance(false)
        setDefaultKey('1')
    }
    
    return (
        <Tabs defaultActiveKey='1' size="small">
            <TabPane
                tab={
                    <span onClick={getAll}>
                    <AppleOutlined />
                    All Time
                    </span>
                }
                key="1"
                >
                    { (category === 'all')?
                        <ItemContainer />
                        :
                        <ItemList item={allItem}/>
                    }
                
            </TabPane>
            <TabPane
                tab={
                    <span  onClick={getMonth}>
                    <AndroidOutlined />
                    This Month
                    </span>
                }
                key="2"
               
                >
                    { (category === 'all')?
                        <ItemContainer />
                        :
                        <ItemList item={allItem}/>
                    }
                
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