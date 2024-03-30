import { useState } from "react";
import "./style.css";

const InitialItems = [
  {
    id: 1,
    description: "passports",
    quantity: 2,
    packed: false,
  },
  {
    id: 2,
    description: "socks",
    quantity: 12,
    packed: false,
  },
];
function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItems(id) {
    setItems((id) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="App">
      <Logo />
      <Form onaddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
      />
      <Stats />
    </div>
  );
}

export default App;
function Logo() {
  return (
    <div className="logo">
      <h1 className="logo-header"> 🌲Far Away👜</h1>
    </div>
  );
}
function Form({ onaddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onaddItems(newItem);
    setDescription("");
    setquantity(1);
  }
  return (
    <form className="form" onSubmit={handlesubmit}>
      <div>
        <h3 className="form-header">what do you have for your travel</h3>
      </div>
      <div>
        <select
          value={quantity}
          onChange={(e) => setquantity(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder=" item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <ul className="packing">
      {items.map((item) => (
        <Item
          item={item}
          onDeleteItems={onDeleteItems}
          onToggleItems={onToggleItems}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li className="packing-heade" key={item.id}>
      <span className="packing-header">
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItems(item.id)}
        />
        <span
          style={item.packed ? { textDecoration: "line-through" } : {}}></span>
        {item.quantity}
        {item.description}{" "}
        <span className="close" onClick={() => onDeleteItems(item.id)}>
          &times;
        </span>
      </span>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <p className="stats-header">
        <em>you have X items on the list and you have already packed X (X%)</em>
      </p>
    </footer>
  );
}
