import React from 'react'
import styled from 'styled-components'
import CategoryItem from '../itemDisplay/CategoryItem'


export default function ItemList({item}) {
  
    return (
        <CardContainer>
            {
                item.map(each => {
                    return <CategoryItem item={each} key={each._id}/>
                })
            }   
        </CardContainer>
    )
}

const CardContainer = styled.div`
    margin-bottom: 1rem
`