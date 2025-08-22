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
          <li key={trip.id}>Trip: {trip.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
