import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/AppContext'
import ItemDefault from './ItemDefault'

export default function ItemContainer() {
    const { item } = useContext(GlobalContext)

    return (
        <div>
            {item.data.length > 0 && 
                item.data.map(eachItem => {
                    return <ItemDefault item={eachItem} key={eachItem._id}/>
                })
            }        
        </div>
    )
}
