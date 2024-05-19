import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import LineItem from './LineItem';
const ItemList = ({ items, handlecheck, handledelete }) => {
    return (
        <ul>
            {
                items.map((item) => (
                    <LineItem
                        key={item.id}
                        item={item}
                        handlecheck={handlecheck}
                        handledelete={handledelete}
                    />
                ))
            }
        </ul>
    )
}

export default ItemList