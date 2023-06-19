import { useState } from "react";

export default function App() {
  const [items, setItem] = useState([]);

  function addNewItem(item) {
    setItem((items) => [...items, item]);
  }

  function deleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function toggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addNewItem} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onToggleItem={toggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼 </h1>;
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSumbit(e) {
    e.preventDefault();
    if (!name) return;
    const newItem = { id: Date.now(), name, quantity, packed: false };
    console.log(newItem);
    onAddItem(newItem);

    setName("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>What do you need for your trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        placeholder="item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button> Add </button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.quantity} {item.name}{" "}
      </span>
      <button onClick={() => onDeleteItem(item.id)}> ❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <p class="stats">
        <em>Start by adding any item to your packing list</em>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percPacked = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percPacked === 100
          ? "Well done ! You've packed everything and are ready to go!"
          : `You have ${numItems} items on your list and you have already packed
        ${numPacked} item (${percPacked}%)`}
      </em>
    </footer>
  );
}
