
    import React from 'react';
    import { Loader2 } from 'lucide-react';

    const LoadingSpinner = ({ size = 'md' }) => {
      const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-24 w-24',
      };

      return (
        <div className="flex justify-center items-center">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
        </div>
      );
    };

    export default LoadingSpinner;
  