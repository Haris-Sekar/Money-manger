import { Button } from 'antd'
import React, { useContext, useState } from 'react'
import { Popconfirm, message, Modal, } from 'antd';
import { GlobalContext } from '../contexts/AppContext'
import InputUpdate from '../inputs/InputUpdate'

export default function Edit({thisItem, hide}) {    
    const { deleteItem,setTempId, item, setOldTransaction, oldTransaction, setIsUpdated, getTransactions} = useContext(GlobalContext)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true)
        hide()
        setIsUpdated({loading: false, success: false, error: false})
    };
    const handleCancel = () => {
        setIsModalVisible(false)
        getTransactions()
    };
    function confirm() {
        deleteItem(thisItem._id)
        message.error('Deleted!')
    } 
    function cancel(e) {
        message.success('Canceled!')   
    }

    function handleEdit() {
        showModal()
        hide()
        getOldTransaction(thisItem._id)
        setTempId(thisItem._id)
    }

    function getOldTransaction(id) {
        const old = item.data.filter(each => each._id === id)
        setOldTransaction(old[0])
    }

 
    return (

        <div>
            
            <Button type='primary' size="small"  style={{marginRight: '1rem'}} onClick={handleEdit}>Edit</Button>
            <Modal
                title="Update transaction"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <InputUpdate old={oldTransaction}/>
            </Modal>
            <Popconfirm
                title="Are you sure to delete this transaction?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <Button type="primary" danger size="small">Delete</Button>
            </Popconfirm>
        </div>
    )
}
