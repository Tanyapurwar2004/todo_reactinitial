import React from 'react'
import { FaPlus } from 'react-icons/fa'
import {useRef} from 'react'

const AddItem = ({newItem , setNewItem , handlesubmit}) => {
  const inputRef=useRef();
  return (
      <form className='addForm' onSubmit={handlesubmit} >
        <label htmlFor='addItem'>Add Item</label>
        <input autoFocus
        ref={inputRef}
        id='addItem'
        type='text'
        placeholder='Add Item'
        required
        value={newItem}
        onChange={(e)=>{setNewItem(e.target.value)}}
        />
        <button
          type='sumit'
          aria-label='Add Item'
          onClick={()=>inputRef.current.focus()}
          >
            <FaPlus />
        </button>
      </form>

  )
}

export default AddItem