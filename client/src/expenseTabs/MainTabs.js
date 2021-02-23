import React, {useContext} from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Tabs } from 'antd'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons'
import ItemList from './ItemList'
import ItemContainer from '../itemDisplay/ItemContainer'


export default function MainTabs({category}) {
    const { TabPane } = Tabs;
    const { item } = useContext(GlobalContext)
    const allItem = item.data.filter(each => each.category === category)
    
    return (
        <Tabs defaultActiveKey="1" size="small">
            <TabPane
                tab={
                    <span>
                    <AppleOutlined />
                    Expenses
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
                    <span>
                    <AndroidOutlined />
                    Statistics
                    </span>
                }
                key="2"
                >
                
            </TabPane>
  </Tabs>
    )
}
