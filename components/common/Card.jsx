export default function Card({ children, className = '', hover = true }) {
  const hoverClass = hover ? 'hover:shadow-xl transition-shadow' : '';
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
