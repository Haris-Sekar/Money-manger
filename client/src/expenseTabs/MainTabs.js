import React, {useContext} from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Tabs } from 'antd'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons'
import ItemList from './ItemList'
import ItemContainer from '../itemDisplay/ItemContainer'
import moment from 'moment'

export default function MainTabs({category}) {
    const { TabPane } = Tabs;
    const { item, setItem, getTransactions } = useContext(GlobalContext)
    const allItem = item.data.filter(each => each.category === category)
    const time = moment().format("MMM")

    function getMonth() {
        const allArray = item.data
        const thisMonth = allArray.filter(item => item.date.includes(time))
        setItem(prev => {
            return {...prev, data: thisMonth}
        })
    }
    return (
        <Tabs defaultActiveKey="1" size="small">
            <TabPane
                tab={
                    <span onClick={getTransactions}>
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
