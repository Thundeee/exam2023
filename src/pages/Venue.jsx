import useApi from "../hooks/useApi";
import useCallApi from "../hooks/useCallApi";
import { BASE_URL_VENUES, BASE_URL_BOOKINGS } from "../utils/constants";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Calendar, Text } from 'grommet';
import GuestField from "../components/formfield/GuestField";
import { ModalContext } from "../context/modalContent";
import { useContext } from "react";
const Venue = () => {
  const { id } = useParams();
  const {setOpenModal, setModalInfo, setModalTitle} = useContext(ModalContext);
  const { data, isLoading, isError } = useApi(BASE_URL_VENUES + id + "?_bookings=true&_owner=true");

  const { startFetch, information, isItLoading, isItError } = useCallApi();

  const [pickedDates, setPickedDates] = useState();
  const [activeDate, setActiveDate] = useState(undefined);
  const [booked, setBooked] = useState([]);
  const [guests, setGuests] = useState(1);
  const [owner , setOwner] = useState();
 console.log(data);
  useEffect(() => {
    if (data) {
      const bookingDates = data.bookings.map((booking) => {
        return [
          new Date(booking.dateFrom).toISOString().split("T")[0],
          new Date(booking.dateTo).toISOString().split("T")[0]
        ];
      });
      setBooked(bookingDates);
      setOwner(data.owner);
    }
  }, [data]);
console.log(owner);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  async function submitter(event) {
    event.preventDefault();
    if (!pickedDates || !pickedDates[0][0] || !pickedDates[0][1]) {
      setOpenModal(true);
      setModalTitle('Error!');
      setModalInfo('Please select a start date and an end date!');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: JSON.stringify({
        dateFrom: new Date(pickedDates[0][0]).toDateString(),
        dateTo: new Date(pickedDates[0][1]).toDateString(),
        guests: guests,
        venueId: id
      }),
  }
  console.log(options);
  await startFetch(BASE_URL_BOOKINGS, options);
  if (information && !isItLoading && !isItError) {
    setOpenModal(true);
    setModalTitle('Success!');
    setModalInfo('Booking was created, you can view it in your profile! Enjoy your stay!');
    
  }
}


  function dateCheck(test) {

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
      setPickedDates();
 setOpenModal(true);
      setModalTitle('Date selection failed. Please try again');
      setModalInfo('A booking already exists between these dates. Please select another date.');
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

        <>
          <h1>{data?.name}</h1>
          <p>{data?.description}</p>
          <p>{data?.maxGuests}</p>
        </>
      <form id="venueForm" onSubmit={submitter}>
      <Box gap="small" pad="large">
        <Box direction="row" gap="small">
          <Button
            ref={startDateButton}
            active={activeDate === 'start'}
            label={
              <Box>
                <Text>Start Date</Text>
                <Text>
                  {pickedDates &&
                    pickedDates[0][0] &&
                    new Date(pickedDates[0][0]).toDateString()}
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
                  {pickedDates &&
                    pickedDates[0][1] &&
                    new Date(pickedDates[0][1]).toDateString()}
                </Text>
              </Box>
            }
            onClick={() => setActiveDate('end')}
          />
        </Box>
        <Calendar
          activeDate={activeDate}
          dates={pickedDates}
          onSelect={(arg) => {
            setPickedDates(arg);
            setActiveDate('end');
            dateCheck(arg);


          }}
          disabled={booked}
          range="array"
        />
      </Box>
      <GuestField props={data.maxGuests} guests={guests} setGuests={setGuests}  />
      <Button type="submit" label="Book" />
</form>
    </div>
  );
};

export default Venue;
