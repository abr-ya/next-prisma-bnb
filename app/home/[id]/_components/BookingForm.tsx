import { FC } from "react";
import { IDateRange } from "@/app/_interfaces/booking.interfaces";
import { createBooking } from "@/app/_actions/createBooking";
import { DateRangePicker, NewHomeSubmit } from "@/app/_components";
import Link from "next/link";

interface IBookingForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  booked: IDateRange[];
  homeId: string;
  userId?: string;
}

const BookingForm: FC<IBookingForm> = ({ booked, homeId, userId }) => {
  return (
    <form action={createBooking} className="flex flex-col">
      <input type="hidden" name="homeId" value={homeId} />
      <input type="hidden" name="userId" value={userId} />

      <DateRangePicker reservation={booked} />

      {/* todo: customize titles */}
      {userId ? (
        <NewHomeSubmit />
      ) : (
        <Link href="/api/auth/login" className="text-blue-600">
          Please, Login for Booking
        </Link>
      )}
    </form>
  );
};

export default BookingForm;
