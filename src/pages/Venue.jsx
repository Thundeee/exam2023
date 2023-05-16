import useApi from "../hooks/useApi";
import { BASE_URL_VENUES } from "../utils/constants";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Calendar, Text } from 'grommet';
import GuestField from "../components/formfield/GuestField";

const Venue = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(BASE_URL_VENUES + id + "?_bookings=true");
console.log(data);

  const [datesD, setDatesD] = useState();
  const [activeDate, setActiveDate] = useState(undefined);
  const [booked, setBooked] = useState([]);
console.log(booked);
  useEffect(() => {
    if (data) {
      const bookingDates = data.bookings.map((booking) => {
        return [
          new Date(booking.dateFrom).toISOString().split("T")[0],
          new Date(booking.dateTo).toISOString().split("T")[0]
        ];
      });
      setBooked(bookingDates);
    }
  }, [data]);



  const isDateDisabled = (date) => {
    return booked.some((booking) => {
      const [from, to] = booking;
      return date >= from && date <= to;
    });
  };

  function dateCheck(test) {
    console.log( new Date( test[0][0]).toDateString())
    console.log( new Date( test[0][1]).toDateString())

    if (!test || !test[0][0] || !test[0][1]) {
      return;
    }
    
    const startDate = test[0][0];
    const endDate = test[0][1];

  
    console.log(startDate);
    console.log(endDate);
    const hasBookedDateBetween = booked.some((booking) => {
      const [bookingStartDate, bookingEndDate] = booking;
      return (
        (bookingStartDate >= startDate && bookingStartDate <= endDate) ||
        (bookingEndDate >= startDate && bookingEndDate <= endDate)
      );
    });
  
    if (hasBookedDateBetween) {
      console.log("booking inbetween");
      setDatesD();
    }
  }

  const startDateButton = useRef();
  const endDateButton = useRef();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>An error occurred. Please try again.</p>;
  }

  return (
    <div className="App">
      {data && (
        <>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <p>{data.maxGuests}</p>
        </>
      )}
      <Box gap="small" pad="large">
        <Box direction="row" gap="small">
          <Button
            ref={startDateButton}
            active={activeDate === 'start'}
            label={
              <Box>
                <Text>Start Date</Text>
                <Text>
                  {datesD &&
                    datesD[0][0] &&
                    new Date(datesD[0][0]).toDateString()}
                </Text>
              </Box>
            }
            onClick={() => setActiveDate('start')}
          />
          <Button
            ref={endDateButton}
            active={activeDate === 'end'}
            label={
              <Box>
                <Text>End Date</Text>
                <Text>
                  {datesD &&
                    datesD[0][1] &&
                    new Date(datesD[0][1]).toDateString()}
                </Text>
              </Box>
            }
            onClick={() => setActiveDate('end')}
          />
        </Box>
        <Calendar
          activeDate={activeDate}
          dates={datesD}
          onSelect={(arg) => {
            setDatesD(arg);
            setActiveDate('end');
            dateCheck(arg);


          }}
          disabled={booked}
          range="array"
        />
      </Box>
      <GuestField props={data.maxGuests}  />
    </div>
  );
};

export default Venue;
