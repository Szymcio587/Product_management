export function Textarea({ className = '', ...props }) {
    return (
      <textarea
        {...props}
        className={`border rounded px-3 py-2 w-full mb-2 ${className}`}
      />
    );
  }
  