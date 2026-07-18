export default function Container({ children, className = '' }) {
  return (
    <div className={`w-[min(1100px,92%)] mx-auto ${className}`}>{children}</div>
  )
}

