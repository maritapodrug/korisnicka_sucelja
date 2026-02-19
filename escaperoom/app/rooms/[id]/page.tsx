import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const rooms = [
  {
    id: "time-machine",
    title: "CHRONOCRASH: THE TIME RIFT",
    description: "Trapped in a broken time machine, you're jumping through timelines. Fix the machine — or be erased from history.",
    img: "/rooms/room11.jpg",
    details: "Full room description, puzzles, difficulty, etc."
  },
  {
    id: "the-heist",
    title: "THE MASTERPIECE HEIST",
    description: "Infiltrate the city's most secure museum and steal a priceless painting...",
    img: "/rooms/room22.jpg",
    details: "Full room description, puzzles, difficulty, etc."
  },
  {
    id: "pharaohs-curse",
    title: "CURSE OF THE PHARAOH",
    description: "You've entered a long-lost pharaoh's tomb...",
    img: "/rooms/room3.jpg",
    details: "Full room description, puzzles, difficulty, etc."
  }
];

interface RoomPageProps {
  params: { id: string };
}

export default function RoomPage({ params }: RoomPageProps) {
  const room = rooms.find(r => r.id === params.id);
  if (!room) return <div>Room not found</div>;

  return (
    <main className="max-w-4xl mx-auto py-20 px-6 flex flex-col gap-8">
      <Link href="/rooms" className="flex items-center gap-2 text-purple-400 hover:text-purple-600">
        <ArrowLeft /> Back to rooms
      </Link>

      <h1 className="text-4xl font-extrabold">{room.title}</h1>
      <p className="text-gray-400">{room.description}</p>

      <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
        <Image src={room.img} alt={room.title} fill className="object-cover" />
      </div>

      <div className="mt-6 text-gray-200">
        {room.details}
      </div>
    </main>
  );
}
