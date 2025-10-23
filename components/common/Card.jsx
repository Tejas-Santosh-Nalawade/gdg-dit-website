export default function Card({ children, className = '', hover = true }) {
  const hoverClass = hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer' : '';
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
