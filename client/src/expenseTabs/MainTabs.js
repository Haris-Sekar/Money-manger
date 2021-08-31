import React, {useContext} from 'react'
import { GlobalContext } from '../contexts/AppContext'
import { Tabs, Spin } from 'antd'
import ItemList from './ItemList'
import ItemContainer from '../itemDisplay/ItemContainer'
import moment from 'moment'


export default function MainTabs({category}) {
    const { TabPane } = Tabs;
    const { item, setItem, getTransactions, setFreeBalance, keyTab, setKeyTab } = useContext(GlobalContext)
    const allItem = item.data.filter(each => each.category === category)
    const month = moment().format("MMM")
    const year = moment().format("YYYY")
    
    function getMonth() {
        const allArray = item.data
        const thisMonth = allArray.filter(item => item.date.includes(month) && item.date.includes(year))
        setFreeBalance(true)
        setItem(prev => {
            return {...prev, data: thisMonth}
        })
        setKeyTab('2')
       
    }

    function getAll() {
       setItem(prev => {
           return {...prev, Loading: true}
       })
        setFreeBalance(false)
        getTransactions()
        
        setKeyTab('1')
    }  
    return (
        <Tabs  activeKey={keyTab} size='middle' type='card' animated className='nice' style={{height: '85vh', overflow: 'auto'}}>
            <TabPane
                tab={
                    <span onClick={getAll}>
                    All Time
                    {item.Loading && <Spin size='small' style={{paddingLeft: '5px'}}/> }
                    </span>
                }
                key="1"
                >
                    <>{item.Loading? <p>Loading...</p>: (category === 'all')?
                        <ItemContainer />
                        :
                        <ItemList item={allItem}/> }
                    </>
                
            </TabPane>
            <TabPane
                tab={
                    <span  onClick={getMonth}>
                  
                    This Month
                    </span>
                }
                key="2"
               
                >
                    <>{(category === 'all')?
                        <ItemContainer />
                        :
                        <ItemList item={allItem}/>}
                    </>
            </TabPane>
  </Tabs>
    )
}

