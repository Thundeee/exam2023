import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/formfield/Formfield";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../../utils/yupSchema";
import useCallApi from "../../hooks/useCallApi";
import { AuthContext } from "../../context/auth";
import {
  Typography,
  useTheme,
  Switch,
  Button,
  FormControlLabel,
} from "@mui/material";
import defaultVenue from "../../assets/defaultVenue.webp";
import { BASE_URL_VENUES } from "../../utils/constants";
import { ModalContext } from "../../context/modalContent";
import {
  BoxContainer,
  FormContainer,
  RowContainer,
  FieldContainer,
  SwitchContainer,
  MediaContainer,
  ButtonContainer,
  PreviewContainer,
  VenueInfoWrapper,
  VenueImageWrapper,
  Form,
  StyledImage,
} from "./venueCreate.styles";
import Metas from "../../components/Metas";

const VenueCreate = () => {
  const theme = useTheme();

  const { setOpenModal, setModalInfo, setModalTitle } =
    useContext(ModalContext);
  const { token } = useContext(AuthContext);
  const [internet, setInternet] = useState(false);
  const [parkingSpace, setParkingSpace] = useState(false);
  const [breakfastMeal, setbreakfastMeal] = useState(false);
  const [petFriendly, setpetFriendly] = useState(false);

  const [media, setMedia] = useState([]);

  let metaCollection = {
    wifi: internet,
    parking: parkingSpace,
    breakfast: breakfastMeal,
    pets: petFriendly,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { startFetch, information, isItLoading, isItError } = useCallApi();

  // submit function that sends the new venue to the api
  const onSubmit = async (venueData) => {
    console.log(venueData);
    if (media[0]) {
      venueData.media = media;
      console.log("bilder", venueData.media);
    }

    const modifiedData = {
      ...venueData,
      meta: {
        wifi: internet,
        parking: parkingSpace,
        breakfast: breakfastMeal,
        pets: petFriendly,
      },
      location: {
        address: venueData.address,
        city: venueData.city,
        country: venueData.country,
        zip: venueData.zip,
        continent: "Unknown",
        lat: 0,
        lng: 0,
      },
      rating: 0,
      media: venueData.media,
    };

    delete modifiedData.address;
    delete modifiedData.city;
    delete modifiedData.country;
    delete modifiedData.zip;

    console.log(modifiedData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: JSON.stringify(modifiedData),
    };
    await startFetch(BASE_URL_VENUES, options);
  };

  // if the api call is successful, a modal will pop up
  useEffect(() => {
    if (information && !isItLoading && !isItError) {
      setOpenModal(true);
      setModalTitle("Success!");
      setModalInfo("Venue was created");
    }
  }, [
    information,
    isItLoading,
    isItError,
    setOpenModal,
    setModalInfo,
    setModalTitle,
  ]);

  //Checks if the image is a valid url and adds it to the media array
  const handleMediaInputChange = (event) => {
    const imageValue = event.target.value;
    if (
      imageValue.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/i)
    ) {
      setMedia([...media, imageValue]);
      event.target.value = "";
    }
  };

  //Removes the image from the media array via button click
  const removeMedia = (mediaValue) => {
    setMedia(media.filter((item) => item !== mediaValue));
  };

  if (!token) {
    return (
      <div className="App">
        <p>Please log in before trying to create a venue</p>
      </div>
    );
  }

  if (!userInfo?.venueManager) {
    return (
      <div className="App">
        <p>Only Venue managers can list venues.</p>
      </div>
    );
  }

  //watching the form data for changes making the preview in real time
  const previewData = watch();
  previewData.media = media;

  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}>Create a new venue!</h2>

      <BoxContainer>
        <FormContainer>
          <Form id="venueForm" onSubmit={handleSubmit(onSubmit)}>
            <FieldContainer>
              <FormField
                name="name"
                label="Venue Name"
                type="text"
                placeholder={"Venue Name"}
                register={register}
                errors={errors}
              />
            </FieldContainer>

            <FieldContainer>
              <FormField
                name="description"
                label="Venue Description"
                type="textarea"
                placeholder={"Venue Description"}
                register={register}
                errors={errors}
                inputProps={{ rows: 3 }}
              />
            </FieldContainer>

            <FieldContainer>
              <FormField
                name="price"
                label="Price per night"
                type="number"
                placeholder={"Price per night"}
                register={register}
                errors={errors}
              />
            </FieldContainer>

            <FieldContainer>
              <FormField
                name="maxGuests"
                label="Maximum Guests"
                type="number"
                placeholder={"Maximum Guests"}
                register={register}
                errors={errors}
              />
            </FieldContainer>

            <RowContainer>
              <SwitchContainer>
                <FormControlLabel
                  control={<Switch onChange={() => setInternet(!internet)} />}
                  label="Wifi?"
                />
              </SwitchContainer>

              <SwitchContainer>
                <FormControlLabel
                  control={
                    <Switch onChange={() => setParkingSpace(!parkingSpace)} />
                  }
                  label="Parking?"
                />
              </SwitchContainer>

              <SwitchContainer>
                <FormControlLabel
                  control={
                    <Switch onChange={() => setbreakfastMeal(!breakfastMeal)} />
                  }
                  label="Breakfast?"
                />
              </SwitchContainer>

              <SwitchContainer>
                <FormControlLabel
                  control={
                    <Switch onChange={() => setpetFriendly(!petFriendly)} />
                  }
                  label="Pets?"
                />
              </SwitchContainer>
            </RowContainer>

            <MediaContainer>
              <FormField
                name="media"
                label="Media (Optional)"
                type="text"
                placeholder={"Media URL"}
                register={register}
                errors={errors}
                inputProps={{ onChange: handleMediaInputChange }}
              />
              {media.map((mediaItem, index) => (
                <div key={index}>
                  <img src={mediaItem} alt={`Media item ${index}`} />
                  <button onClick={() => removeMedia(mediaItem)}>Remove</button>
                </div>
              ))}
            </MediaContainer>

            <FieldContainer>
              <FormField
                name="address"
                label="Address (Optional)"
                type="text"
                placeholder={"Address"}
                register={register}
                errors={errors}
              />
            </FieldContainer>

            <FieldContainer>
              <FormField
                name="city"
                label="City (Optional)"
                type="text"
                placeholder={"City"}
                register={register}
                errors={errors}
              />
            </FieldContainer>

            <FieldContainer>
              <FormField
                name="zip"
                label="Zip Code (Optional)"
                type="text"
                placeholder={"Zip Code"}
                register={register}
                errors={errors}
              />
            </FieldContainer>

            <FieldContainer>
              <FormField
                name="country"
                label="Country (Optional)"
                type="text"
                placeholder={"Country"}
                register={register}
                errors={errors}
              />
            </FieldContainer>

            <ButtonContainer>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
        <PreviewContainer backgroundColor={theme.palette.tertiary.main}>
          <VenueInfoWrapper>
            <Typography variant="h5">
              {previewData.name ? previewData.name : "Venue Preview"}
            </Typography>
            {previewData.price || previewData.maxGuests ? (
              <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
                Price: {previewData.price},- | Max Guests:{" "}
                {previewData.maxGuests}
              </Typography>
            ) : (
              "Price and Guest limit goes here"
            )}
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
              }}
            >
              {previewData.description
                ? previewData.description
                : "Your description goes here"}
            </Typography>
            <Metas path={metaCollection} />
          </VenueInfoWrapper>
          <VenueImageWrapper>
            <StyledImage
              src={previewData.media[0] ? previewData.media[0] : defaultVenue}
              alt={previewData.name}
            />
          </VenueImageWrapper>
        </PreviewContainer>
      </BoxContainer>
    </div>
  );
};

export default VenueCreate;
