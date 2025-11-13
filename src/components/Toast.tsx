export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg animate-bounce">
      {message}
    </div>
  );
}
