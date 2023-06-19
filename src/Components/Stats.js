export default function Stats({ items }) {
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
