import React, {useState} from 'react'
import { Card, Popover, Button } from 'antd'
import {EditOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Edit from '../editItem/Edit'


export default function ItemDefault({item}) {
    const [visible, setVisible] = useState(false)
    const hide = () => {
        setVisible(false)
    }
    const show = () => {
        setVisible(true)
    }
    return (
        <CardContainer>
           
                <Card 
                    style={{cursor: 'default'}}
                    hoverable 
                    size="small" 
                    title={item.category} 
                    extra={<span style={{color: item.amount>0? '#3F8600': '#CF1322'}}>
                                {item.amount} ₹
                                <Popover 
                                    placement="topRight"
                                    content={<Edit thisItem={item} hide={hide}/>} 
                                    title={<p>{item.name}&nbsp; &nbsp; &nbsp;<a onClick={hide}>close</a></p>} 
                                    trigger="click" 
                                    visible={visible} 
                                    onVisibleChange={show}>
                                        <Button type='link'><EditOutlined onClick={show} /></Button>
                                </Popover>
                            </span>}
                >
                    {item.name}&nbsp;-&nbsp;<span style={{fontSize: '0.8rem', color: '#8C8C8C'}}>{item.date}</span>
                </Card>
        </CardContainer>
    )
}

const CardContainer = styled.div`
    margin-bottom: 1rem;
`