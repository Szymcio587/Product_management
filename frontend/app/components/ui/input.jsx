export function Input({ className = '', ...props }) {
    return (
      <input
        {...props}
        className={`border rounded px-3 py-2 w-full mb-2 ${className}`}
      />
    );
  }
  