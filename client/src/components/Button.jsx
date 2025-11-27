import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false, 
  onClick, 
  ...props 
}) => {
  // Construct class names based on props
  // The test expects classes like 'btn-primary', 'btn-lg', 'btn-disabled'
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const disabledClass = disabled ? 'btn-disabled' : '';
  
  // Combine all classes
  const classes = [variantClass, sizeClass, disabledClass, className]
    .filter(Boolean) // Remove empty strings
    .join(' ');

  return (
    <button 
      className={classes} 
      disabled={disabled} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;