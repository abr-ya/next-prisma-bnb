"use client";

import { DateRange, Range } from "react-date-range";
import { FC, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import ruLocale from "date-fns/locale/ru";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { IDateRange } from "../_interfaces/booking.interfaces";

interface IDateRangePicker {
  reservation: IDateRange[];
}

const DateRangePicker: FC<IDateRangePicker> = ({ reservation }) => {
  const [state, setState] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  let disabledDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });
  return (
    <>
      <input type="hidden" name="startDate" value={state && state.startDate ? state.startDate.toISOString() : ""} />
      <input type="hidden" name="endDate" value={state && state.endDate ? state.endDate.toISOString() : ""} />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={[state]}
        onChange={(item) => setState(item.selection)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
        locale={ruLocale}
      />
    </>
  );
};

export default DateRangePicker;
