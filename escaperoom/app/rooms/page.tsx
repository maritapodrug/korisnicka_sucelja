import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    id: "time-machine",
    title: "CHRONOCRASH: THE TIME RIFT",
    description: "Trapped in a broken time machine...",
    img: "/rooms/room11.jpg"
  },
  {
    id: "the-heist",
    title: "THE MASTERPIECE HEIST",
    description: "Infiltrate the city's most secure museum...",
    img: "/rooms/room22.jpg"
  },
  {
    id: "pharaohs-curse",
    title: "CURSE OF THE PHARAOH",
    description: "You've entered a long-lost pharaoh's tomb...",
    img: "/rooms/room3.jpg"
  }
];

export default function RoomsPage() {
  return (
    <main className="max-w-7xl mx-auto py-32 px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
      {rooms.map(room => (
        <div key={room.id} className="glass rounded-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 shadow-xl">
          <div className="relative h-56">
            <Image src={room.img} alt={room.title} fill className="object-cover" />
          </div>
          <div className="p-8">
            <h3 className="font-bold text-lg mb-2 tracking-wider">{room.title}</h3>
            <p className="text-sm text-gray-400 mb-6">{room.description}</p>
            <Link
              href={`/rooms/${room.id}`}
              className="inline-block border border-white/20 px-5 py-2 rounded-lg text-sm hover:bg-white/10 transition"
            >
              LEARN MORE →
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
