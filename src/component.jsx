function Component({value, onValueChange}) {
  return (
    <div>
      <h2>Change value</h2>
      <input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
}
