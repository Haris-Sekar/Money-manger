import React, { useContext } from 'react'
import AllTabs from '../expenseTabs/AllTabs'
import styled from 'styled-components'
import { GlobalContext } from '../contexts/AppContext'
import OverallChart from '../statsTabs/OverallChart'
import { Spin } from 'antd'

export default function Home() {
    const { item } = useContext(GlobalContext)

    return (
        <>
        { item.loading? 
            <SpinWrapper>
                <SpinStyle>
                    <Spin />
                </SpinStyle>  
            </SpinWrapper>:
            <HomeStyled>
                <OverallChart />
                <AllTabs />
            </HomeStyled>
        }
        </>
        
    )
}

const HomeStyled = styled.div`
    
    margin-top: 2rem;
`

const SpinWrapper = styled.div`
 position: relative;
`

const SpinStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`