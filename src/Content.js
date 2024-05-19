import React from 'react';
import ItemList from './ItemList';

const Content = ({ items, handlecheck, handledelete }) => {
    // const [name , setName]=useState('');
    // const [count , setCount]=useState(0);
    // const handlename=()=>{
    //     const names=['bob' , 'kelvin', 'tanya','harshita'];
    //     const i=Math.floor(Math.random()*4);
    //    setName(names[i]);
    //   }
    //   const handleclick=()=>{
    //     setCount(count+1);
    //     setCount(count+1);
    //     console.log(count);

    //   }
    //   const handleclick2=()=>{
    //     console.log(count);
    //   }


    return (
        <>

            {items.length ? (
                <ItemList items={items}
                    handlecheck={handlecheck}
                    handledelete={handledelete} />
            ) : (
                <p style={{ marginTop: "2rem" }}>Your list is empty</p>
            )
            }


        </>
    )
}

export default Content