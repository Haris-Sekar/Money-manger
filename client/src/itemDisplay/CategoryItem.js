import React, {useState} from 'react'
import { Card, Popover, Button } from 'antd'
import {SettingOutlined} from '@ant-design/icons'
import styled from 'styled-components'
import Edit from '../editItem/Edit'


export default function CategoryItem({item}) {
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
                    title={item.name} 
                    extra={<span style={{color: item.amount>0? '#3F8600': '#CF1322'}}>
                                {item.amount}K 
                                <Popover 
                                    placement="topRight"
                                    content={<Edit thisItem={item} hide={hide}/>} 
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    title={<p>{item.name}&nbsp; &nbsp; &nbsp;<a onClick={hide}>close</a></p>} 
                                    trigger="click" 
                                    visible={visible} 
                                    onVisibleChange={show}>
                                        <Button type='link'><SettingOutlined onClick={show} /></Button>
                                </Popover>
                            </span>}
                >
                   <span style={{fontSize: '0.8rem', color: '#8C8C8C'}}>{item.date}</span>
                </Card>
        </CardContainer>
    )
}

const CardContainer = styled.div`
    margin-bottom: 1rem;
`