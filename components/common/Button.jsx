import Link from 'next/link';

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-block font-semibold transition-all duration-300 rounded-full text-center';
  
  const variants = {
    primary: 'text-white hover:shadow-lg',
    secondary: 'text-white hover:shadow-lg',
    outline: 'border-2 hover:shadow-lg',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Google official colors
  const variantStyles = {
    primary: { backgroundColor: '#4285f4' },
    secondary: { backgroundColor: '#34a853' },
    outline: { borderColor: '#4285f4', color: '#4285f4' },
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes} style={variantStyles[variant]} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={classes} style={variantStyles[variant]} {...props}>
      {children}
    </button>
  );
}
