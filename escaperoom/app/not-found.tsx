export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0214] text-white text-center px-6">
      <div>
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-xl mb-8">You are lost in the darkness...</p>
        <a
          href="/"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
        >
          Return Home
        </a>
      </div>
    </div>
  )
}