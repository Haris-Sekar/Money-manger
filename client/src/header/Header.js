import React, {useContext, useState} from 'react'
import { PageHeader, Row, Statistic, Button, Modal} from 'antd'
import styled from 'styled-components'
import { GlobalContext } from '../contexts/AppContext'
import ExpenseInput from '../inputs/ExpenseInput'

export default function Header() {
    const { balance, totalIncome, totalExpense, item, setItem} = useContext(GlobalContext)
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
      <Row>
        <Statistic 
          title="Balance" 
          suffix={item.loading? null: "K"}
          value={balance} 
          valueStyle={{color: '#1285FF', fontSize: '1rem'}}
          key='1'
        />
        <Statistic
          title="Income"
          value={totalIncome}
          valueStyle={{ color: '#3f8600', fontSize: '1rem' }}
          suffix={item.loading? null: "K"}
          key='2'
          style={{
            margin: '0 32px'
          }}
        />
        <Statistic
          title="Expense"
          value={totalExpense}
          valueStyle={{ color: '#cf1322', fontSize: '1rem' }}
          suffix={item.loading? null: "K"}
          key='3'
        />
      </Row>
    )
    return (
        <HeaderContainer >
            <PageHeader
                className="site-page-header"
                title="Money Tracker"
                subTitle=""
                extra={
                  <Button type="primary"  onClick={showModal}>
                    Add Item
                  </Button>
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