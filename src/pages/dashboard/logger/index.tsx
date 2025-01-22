export default function Logger() {
  const { count, increment, loadFromIDB } = {}
  return (
    <div>
      {count}
      <button
        onClick={() => {
          increment()
        }}
      >
        increment
      </button>
    </div>
  );
}
