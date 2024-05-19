import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest  from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3000/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError , setFetchError]= useState(null);
  const [isLoading ,setIsLoading]=useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not recieve expected data');
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout (()=>  fetchItems(),2000);
    
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    // console.log( typeof(items[items.length - 1].id));
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    // console.log(listItems);
   
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
    
  }
  const handlecheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems)
    // console.log(typeof(id));
    // console.log(typeof(items[0].id));

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    console.log(reqUrl);
    if (result) setFetchError(result);
  }
  const handledelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {method:'DELETE'};
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title={"Grocery List"} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handlesubmit={handlesubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p> }
        {fetchError && <p style={{color: "red"}}>{`Error : ${fetchError}`}</p> }
        {!fetchError && !isLoading && <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handlecheck={handlecheck}
        handledelete={handledelete}
      /> }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
