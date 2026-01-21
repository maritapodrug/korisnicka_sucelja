import { Navigation } from "@components/navigation";
import BookingClient from "@components/bookingClient";

export default function Page() {
  return (
      <div><h1 className="text-6xl font-extrabold tracking-tight">Book now</h1>
      <BookingClient/>
</div>
    
  );
}