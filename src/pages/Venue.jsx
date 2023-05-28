import useApi from "../hooks/useApi";
import useCallApi from "../hooks/useCallApi";
import { BASE_URL_VENUES, BASE_URL_BOOKINGS } from "../utils/constants";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Calendar, Text } from "grommet";
import GuestField from "../components/formfield/GuestField";
import { ModalContext } from "../context/modalContent";
import { useContext } from "react";
const Venue = () => {
    const { id } = useParams();
    const { setOpenModal, setModalInfo, setModalTitle } =
        useContext(ModalContext);
    const { data, isLoading, isError } = useApi(
        BASE_URL_VENUES + id + "?_bookings=true&_owner=true&?_customer=true"
    );
    const { startFetch, information, isItLoading, isItError } = useCallApi();
    const [pickedDates, setPickedDates] = useState();
    const [activeDate, setActiveDate] = useState(undefined);

    const [booked, setBooked] = useState([]);
    const [guests, setGuests] = useState(1);
    const [owner, setOwner] = useState();

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thePast = ["1970-01-01", yesterday.toISOString().split("T")[0]];

    useEffect(() => {
        if (data) {
            const bookingDates = data.bookings.map((booking) => {
                return [
                    new Date(booking.dateFrom).toISOString().split("T")[0],
                    new Date(booking.dateTo).toISOString().split("T")[0],
                ];
            });

            const allBookedDates = [thePast, ...bookingDates]; 
            setBooked(allBookedDates);
            if (data.owner.name === userInfo?.name) {
                setOwner(data.owner);
            }
            
        }
    }, [data]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    async function submitter(event) {
        event.preventDefault();
        if (!pickedDates || !pickedDates[0][0] || !pickedDates[0][1]) {
            setOpenModal(true);
            setModalTitle("Error!");
            setModalInfo("Please select a start date and an end date!");
            return;
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
            body: JSON.stringify({
                dateFrom: new Date(pickedDates[0][0]).toDateString(),
                dateTo: new Date(pickedDates[0][1]).toDateString(),
                guests: guests,
                venueId: id,
            }),
        };
        console.log(options);
        await startFetch(BASE_URL_BOOKINGS, options);

    }
    useEffect(() => {
        if (information && !isItLoading && !isItError && !owner) {
            setOpenModal(true);
            setModalTitle("Success!");
            setModalInfo(
                "Booking was created, you can view it in your profile! Enjoy your stay!"
            );
        }
    }, [information, isItLoading, isItError]);

    function dateCheck(dateArray) {
        if (!dateArray || !dateArray[0][0] || !dateArray[0][1]) {
            return;
        }

        const startDate = dateArray[0][0];
        const endDate = dateArray[0][1];

        console.log(startDate);
        console.log(endDate);
        const hasBookedDateBetween = booked.some((booking) => {
            const [bookingStartDate, bookingEndDate] = booking;
            return (
                (bookingStartDate >= startDate &&
                    bookingStartDate <= endDate) ||
                (bookingEndDate >= startDate && bookingEndDate <= endDate)
            );
        });

        if (hasBookedDateBetween) {
            console.log("booking inbetween");
            setPickedDates();
            setOpenModal(true);
            setModalTitle("Date selection failed. Please try again");
            setModalInfo(
                "A booking already exists between these dates. Please select another date."
            );
            console.log("bookingqwudhuuhqw");
        }
    }

    const startDateButton = useRef();
    const endDateButton = useRef();
console.log(data);
 async function upcoming() {


    setModalTitle(`Upcoming bookings for ${data.name}`);
    setModalInfo(
        data.bookings.map((booking) => {
            return (
                <div style={{marginBottom: '10px', border: '1px black solid', textAlign: 'center'}}>
                    <p>
                        {new Date(booking.dateFrom).toDateString()} - {new Date(booking.dateTo).toDateString()}
                    </p>
                    <p>Guests: {booking.guests}</p>
                    <Button onClick={() => moreInfo(booking.id)}>More info</Button>
                </div>
            

    );
            })
        );
    setOpenModal(true);
 }


 async function moreInfo(BookId) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.accessToken}`,
        },
    };
    await startFetch(BASE_URL_BOOKINGS  + BookId + '?_customer=true', options);
 }

 useEffect(() => {
    if (information && !isItLoading && !isItError && owner) {
      console.log(information);
      setOpenModal(true);
      setModalTitle("Booking information");
      setModalInfo(
        <>
          <div style={{ marginBottom: '10px', border: '1px black solid', textAlign: 'center' }}>
            <p>{information.customer.name}</p>
            <p>{information.customer.email}</p>
            <p>{new Date(information.dateFrom).toDateString()} - {new Date(information.dateTo).toDateString()}</p>
            <p>Guests: {information.guests}</p>
            <Button onClick={upcoming}>Return</Button>
          </div>
        </>
      );
    }
  }, [information, isItLoading, isItError]);
  

    if (isLoading) {
        
        return (
        <div className="App">

        <p>Loading...</p>;
        </div>)
    }
    if (isError) {
        return (
        <div className="App">
        <p>An error occurred. Please try again.</p>;
        </div>)
    }

    return (
        <div className="App">
            <>
                <h1>{data?.name}</h1>
                <p>{data?.description}</p>
                <p>{data?.maxGuests}</p>
                <p>{data?.name} currently has {booked.length -1} booking(s).</p>
            </>
            <form id="venueForm" onSubmit={submitter}>
                <Box gap="small" pad="large">
                    <Box direction="row" gap="small">
                        <Button
                            ref={startDateButton}
                            active={activeDate === "start"}
                            label={
                                <Box>
                                    <Text>Start Date</Text>
                                    <Text>
                                        {pickedDates &&
                                            pickedDates[0][0] &&
                                            new Date(
                                                pickedDates[0][0]
                                            ).toDateString()}
                                    </Text>
                                </Box>
                            }
                            onClick={() => setActiveDate("start")}
                        />
                        <Button
                            ref={endDateButton}
                            active={activeDate === "end"}
                            label={
                                <Box>
                                    <Text>End Date</Text>
                                    <Text>
                                        {pickedDates &&
                                            pickedDates[0][1] &&
                                            new Date(
                                                pickedDates[0][1]
                                            ).toDateString()}
                                    </Text>
                                </Box>
                            }
                            onClick={() => setActiveDate("end")}
                        />
                    </Box>
                    <Calendar
                        activeDate={activeDate}
                        dates={pickedDates}
                        onSelect={(arg) => {
                            setPickedDates(arg);
                            setActiveDate("end");
                            dateCheck(arg);
                        }}
                        disabled={booked}
                        range="array"
                    />
                </Box>

                {owner ? (
  <Button label="See upcoming bookings" onClick={upcoming} />
) : (
  <>
    <GuestField
      props={data.maxGuests}
      guests={guests}
      setGuests={setGuests}
    />
    <Button type="submit" label="Book Venue!" />
  </>
)}
            </form>
        </div>
    );
};

export default Venue;
