import Link from "next/link";
import { FC } from "react";

interface ITripListProps {
  trips: Array<{
    id: string;
    title: string;
  }>;
}

const TripList: FC<ITripListProps> = ({ trips }) => {
  console.log("Rendering TripList with trips:", trips);

  return (
    <div>
      <h2>Trip List</h2>
      <ul>
        {trips.map((trip) => (
          <Link href={`/trips/${trip.id}`} key={trip.id}>
            <li>Trip: {trip.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
