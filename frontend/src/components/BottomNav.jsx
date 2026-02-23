import { Home, User, MessageCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function BottomNav() {
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-md flex justify-around py-3">
      <button onClick={() => navigate("/")}><Home /></button>
      <button onClick={() => navigate("/ask-ai")}><MessageCircle /></button>
      <button onClick={() => navigate("/profile")}><User /></button>
    </div>
  )
}
