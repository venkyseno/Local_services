export default function AskAI() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Ask AI</h1>
      <textarea
        placeholder="Describe your issue..."
        className="w-full border p-3 rounded-lg"
      />
      <button className="bg-blue-600 text-white p-3 rounded-lg w-full">
        Analyze
      </button>
    </div>
  );
}
