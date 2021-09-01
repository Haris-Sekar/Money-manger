import React, { useContext } from 'react'
import AllTabs from '../expenseTabs/AllTabs'
import styled from 'styled-components'
import { GlobalContext } from '../contexts/AppContext'
import OverallChart from '../statsTabs/OverallChart'
import { Spin } from 'antd'
import Header from '../header/Header'


export default function Home() {
    const { item } = useContext(GlobalContext)

    return (
        <Body>
        { item.loading? 
            <SpinWrapper>
                <SpinStyle>
                    <Spin />
                </SpinStyle>  
            </SpinWrapper>:
            <Container>
            <Header />
            <HomeStyled>
                {/* <OverallChart /> */}
                <AllTabs />
            </HomeStyled>
            </Container>
        }
        </Body>
        
    )
}

const Container = styled.div`
    
`

const HomeStyled = styled.div`
    
    margin-top: 1rem;
    padding-bottom: 1rem;
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
const Body = styled.div`
    margin: 0 auto;
 
`