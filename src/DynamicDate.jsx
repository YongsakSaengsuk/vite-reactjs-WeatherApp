export default function DynamicDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();
  const date = `${day}.${month}.${year}`;
  return <div className="date">{date}</div>;
}
