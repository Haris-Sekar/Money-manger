import React, {useContext, useState} from 'react'
import { PageHeader, Row, Statistic, Button, Modal, Space} from 'antd'
import styled from 'styled-components'
import { GlobalContext } from '../contexts/AppContext'
import ExpenseInput from '../inputs/ExpenseInput'
import {Link} from 'react-router-dom';

export default function Header() {
    const { balance, totalIncome, totalExpense, item, setItem, keyTab} = useContext(GlobalContext)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
      setIsModalVisible(true);
      setItem(prev => {
        return {...prev, added: true, success: false, error: false}
      })
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const content = (
      <div>
      <Row style={{marginBottom: '1rem'}}>
        <Statistic 
          title="Balance" 
          suffix={item.loading? null: "K"}
          value={balance} 
          valueStyle={{color: '#1285FF', fontSize: '1rem'}}
          key='1'
        />
        <Statistic
          title={keyTab === "1" ? "Total Income" : 'This Month'}
          value={totalIncome}
          valueStyle={{ color: '#3f8600', fontSize: '1rem' }}
          suffix={item.loading? null: "K"}
          key='2'
          style={{
            margin: '0 40px'
          }}
        />
        <Statistic
          title={keyTab === "1" ? "Total Expense" : 'This Month'}
          value={totalExpense}
          valueStyle={{ color: '#cf1322', fontSize: '1rem' }}
          suffix={item.loading? null: "K"}
          key='3'
        />
      </Row>
      
      <Row>
      <Link to="/">Home</Link>
        <Link  style={{
            margin: '0 32px'
          }} to="/charts">Charts</Link>
      </Row>
      
      </div>
    )
    return (
        <HeaderContainer >
            <PageHeader
                className="site-page-header"
                title="Money Tracker"
                subTitle=""
                extra={<>{!item.loading ?
                  <Button type="primary"  onClick={showModal}>
                    Add Item
                  </Button>: null}
                  </>
                }
                avatar={{ src: 'https://lh3.googleusercontent.com/pw/ACtC-3fhiNlf4ZNKX5PXdubT3jxlw2qyL_F51FYF2I4Cir7l0hy-EqrWD-9yU0jpAwvlCD7WKHhKr94nftXm7969XhDVxbpjpYnzD1jbpBOvUUmh2h30TokMATf3SkhRzez8doxFpgLWiZIYKqjsL6VyyUr3=w743-h990-no' }}
            > 
                <div>
                    {content}
                </div>
            </PageHeader>
            <Modal
              title="Add New Transaction"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <ExpenseInput />
            </Modal>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
  
`