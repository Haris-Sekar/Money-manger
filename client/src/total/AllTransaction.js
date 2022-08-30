import React, { useContext, } from 'react'
import { Statistic, Row, Col, Card } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { GlobalContext } from '../contexts/AppContext'
import styled from 'styled-components'

export default function AllTransaction() {
    const { totalExpense, totalIncome, balance } = useContext(GlobalContext)
    
    return (
        <BalanceContainer>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Income"
                value={totalIncome}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="₹"
              />
            </Card>
          </Col>
          
          <Col span={12}>
            <Card>
              <Statistic
                title="Expense"
                value={totalExpense}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="₹"
              />
            </Card>
          </Col>
        </Row>
      </BalanceContainer>
    )
}

const BalanceContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
`