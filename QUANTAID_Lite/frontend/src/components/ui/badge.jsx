import React from 'react';

const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    secondary: 'bg-gray-100 text-gray-900 border-gray-200',
    destructive: 'bg-red-100 text-red-800 border-red-200',
    outline: 'border-gray-200 text-gray-900'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export { Badge };
