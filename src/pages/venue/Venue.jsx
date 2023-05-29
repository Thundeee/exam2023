import useApi from "../../hooks/useApi";
import useCallApi from "../../hooks/useCallApi";
import { BASE_URL_VENUES, BASE_URL_BOOKINGS } from "../../utils/constants";
import { useParams } from "react-router-dom";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  Box as GrommetBox,
  Button as GrommetButton,
  Calendar as GrommetCalendar,
  Text as GrommetText,
} from "grommet";
import { Button, Typography, useTheme } from "@mui/material";
import GuestField from "../../components/formfield/GuestField";
import { ModalContext } from "../../context/modalContent";
import { useContext } from "react";
import Carousel from "../../components/Carousel";
import Metas from "../../components/Metas";
import {
  VenueContainer,
  VenueContentWrapper,
  VenueBookingForm,
  VenueButtonWrapper,
} from "./venue.styles";
import Loader from "../../components/Loader";
import Errorer from "../../components/Errorer";

const Venue = () => {
  const theme = useTheme();
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

  // calculates all dates in the past to be disabled in the calendar
  const yesterday = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }, []);
  const thePast = useMemo(
    () => ["1970-01-01", yesterday.toISOString().split("T")[0]],
    [yesterday]
  );
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // sets the dates that are booked to be disabled in the calendar
  useEffect(() => {
    if (data) {
      const bookingDates = data.bookings.map((booking) => {
        return [
          new Date(booking.dateFrom).toISOString().split("T")[0],
          new Date(booking.dateTo).toISOString().split("T")[0],
        ];
      });
      // adds the past dates to the array of booked dates
      const allBookedDates = [thePast, ...bookingDates];
      setBooked(allBookedDates);
      // checks if the user is the owner of the venue
      if (data.owner.name === userInfo?.name) {
        setOwner(data.owner);
      }
    }
  }, [data, thePast, userInfo?.name]);

  // function to handle submit, checks if the user has picked 2 dates and sends the booking request
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

  // checks if the booking was successful and displays a modal
  useEffect(() => {
    if (information && !isItLoading && !isItError && !owner) {
      setOpenModal(true);
      setModalTitle("Success!");
      setModalInfo(
        "Booking was created, you can view it in your profile! Enjoy your stay!"
      );
    }
  }, [
    information,
    isItLoading,
    isItError,
    owner,
    setOpenModal,
    setModalTitle,
    setModalInfo,
  ]);

  // checks the dates picked by the user and displays a modal if the dates are invalid (having a booking inbetween)
  function dateCheck(dateArray) {
    if (!dateArray || !dateArray[0][0] || !dateArray[0][1]) {
      return;
    }

    const startDate = dateArray[0][0];
    const endDate = dateArray[0][1];

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
      setModalTitle("Date selection failed. Please try again");
      setModalInfo(
        "A booking already exists between these dates. Please select another date."
      );
      console.log("bookingqwudhuuhqw");
    }
  }

  const startDateButton = useRef();
  const endDateButton = useRef();

  // Api call to get the booking info for the venue by the owner
  const moreInfo = useCallback(async (BookId) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    await startFetch(BASE_URL_BOOKINGS + BookId + "?_customer=true", options);
    //eslint-disable-next-line
  }, []);

  // displays a modal with the upcoming bookings for the venue. Only for the owner
  const upcoming = useCallback(async () => {
    setModalTitle(`Upcoming bookings for ${data.name}`);
    setModalInfo(
      data.bookings.map((booking) => {
        return (
          <div
            style={{
              marginBottom: "10px",
              border: "1px black solid",
              textAlign: "center",
            }}
          >
            <p>
              {new Date(booking.dateFrom).toDateString()} -{" "}
              {new Date(booking.dateTo).toDateString()}
            </p>
            <p>Guests: {booking.guests}</p>
            <Button
              onClick={() => moreInfo(booking.id)}
              variant="contained"
              color="primary"
              style={{ marginBottom: "1rem" }}
            >
              More info
            </Button>
          </div>
        );
      })
    );
    setOpenModal(true);
  }, [data, setModalInfo, setModalTitle, setOpenModal, moreInfo]);

  // displays a modal with the booking info for owner after pressing the more info button
  useEffect(() => {
    if (information && !isItLoading && !isItError && owner) {
      console.log(information);
      setOpenModal(true);
      setModalTitle("Booking information");
      setModalInfo(
        <>
          <div
            style={{
              marginBottom: "10px",
              border: "1px black solid",
              textAlign: "center",
            }}
          >
            <p>{information.customer.name}</p>
            <p>{information.customer.email}</p>
            <p>
              {new Date(information.dateFrom).toDateString()} -{" "}
              {new Date(information.dateTo).toDateString()}
            </p>
            <p>Guests: {information.guests}</p>
            <Button
              onClick={upcoming}
              variant="contained"
              color="primary"
              style={{ marginBottom: "1rem" }}
            >
              Return
            </Button>
          </div>
        </>
      );
    }
  }, [
    information,
    isItLoading,
    isItError,
    owner,
    setOpenModal,
    setModalTitle,
    setModalInfo,
    upcoming,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Errorer />;
  }

  return (
    <VenueContainer>
      <>
        <h1 style={{ textAlign: "center" }}>{data?.name}</h1>
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            width: "100%",
          }}
        >
          {data?.description}
        </Typography>
        <VenueContentWrapper>
          <div>
            <p>{data?.price},-</p>
            <Metas path={data?.meta} />
          </div>
          {Array.isArray(data.media) && data.media.length > 0 && (
            <Carousel media={data.media} name={data.name} />
          )}
        </VenueContentWrapper>
        <VenueBookingForm id="venueForm" onSubmit={submitter}>
          <GrommetBox gap="small" pad="large">
            <GrommetBox direction="row" gap="small">
              <GrommetButton
                color={theme.palette.text.primary}
                ref={startDateButton}
                active={activeDate === "start"}
                label={
                  <GrommetBox>
                    <GrommetText color={theme.palette.text.primary}>
                      Start Date
                    </GrommetText>
                    <GrommetText color={theme.palette.text.primary}>
                      {pickedDates &&
                        pickedDates[0][0] &&
                        new Date(pickedDates[0][0]).toDateString()}
                    </GrommetText>
                  </GrommetBox>
                }
                onClick={() => setActiveDate("start")}
              />
              <GrommetButton
                color={theme.palette.text.primary}
                ref={endDateButton}
                active={activeDate === "end"}
                label={
                  <GrommetBox>
                    <GrommetText color={theme.palette.text.primary}>
                      End Date
                    </GrommetText>
                    <GrommetText color={theme.palette.text.primary}>
                      {pickedDates &&
                        pickedDates[0][1] &&
                        new Date(pickedDates[0][1]).toDateString()}
                    </GrommetText>
                  </GrommetBox>
                }
                onClick={() => setActiveDate("end")}
              />
            </GrommetBox>
            <p>
              {data?.name} currently has {booked.length - 1} booking(s).
            </p>
            <GrommetCalendar
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
          </GrommetBox>
          {owner ? (
            <VenueButtonWrapper>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={upcoming}
              >
                See upcoming bookings
              </Button>
            </VenueButtonWrapper>
          ) : (
            <>
              <GuestField
                props={data.maxGuests}
                guests={guests}
                setGuests={setGuests}
              />
              <VenueButtonWrapper>
                {userInfo?.accessToken ? (
                  <Button type="submit" variant="contained" color="primary">
                    Book Venue!
                  </Button>
                ) : (
                  <p>Please login to book a Venue.</p>
                )}
              </VenueButtonWrapper>
            </>
          )}
        </VenueBookingForm>
      </>
    </VenueContainer>
  );
};

export default Venue;
