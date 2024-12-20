export default function Spinner() {
  return <div data-testid="spinner"
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="w-16 h-16 border-4 border-[var(--primary)] border-dotted rounded-full animate-spin"/>
  </div>
}
