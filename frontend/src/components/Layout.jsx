import BottomNav from "./BottomNav";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pb-16">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
