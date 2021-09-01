import React, { useContext, useState } from "react"
import { GlobalContext } from '../contexts/AppContext'
import { Tabs, Button, Modal } from "antd"
import MainTabs from "./MainTabs"
import ExpenseInput from '../inputs/ExpenseInput'
import styled from 'styled-components'

const { TabPane } = Tabs

export default function AllTabs() {
  
  //const operations = {left: <Button style={{marginBottom: '1rem',}} type='primary' size='large' onClick={showModal}>Add Item</Button>}
  const { item } = useContext(GlobalContext)
  let uniqueCategory = []
  if(item.count>0){
    const allCategory = item.data.map(each => {
      return each.category
    }) 
     uniqueCategory = [...new Set(allCategory)]
  }
    return (
      <TabsContainer>
        <ContentContainer>
        {item.count>0? 
          <Tabs tabPosition="left" size="small">
            <TabPane tab='All' key='all' >
                <MainTabs category='all' style={{overflow: 'auto'}}/>
            </TabPane>
              {uniqueCategory.map(eachItem => {
                return <TabPane tab={eachItem} key={eachItem} >
                    <MainTabs category={eachItem} style={{overflow: 'auto'}}/>
                </TabPane>
              })}
          </Tabs>
          :
          <Tabs  tabPosition="left" size="small">
            <TabPane tab='All' key='all'>
                <p>No items</p>
                <p>Click "Add Item" button</p>
            </TabPane>
          </Tabs>
        }
        </ContentContainer>
      </TabsContainer>
    )  
};

const TabsContainer = styled.div`
  padding-right: 1rem;
  background-color: #F0F2F5;
  background-color: white;
  padding: 10px;
  padding-left: 0px;
  overflow: auto;
`

const ContentContainer = styled.div`
`