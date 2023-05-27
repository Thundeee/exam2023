import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/formfield/Formfield";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../../utils/yupSchema";
import useCallApi from "../../hooks/useCallApi";
import { AuthContext } from "../../context/auth";
import { Typography, useTheme, Tooltip, Fade } from "@mui/material";
import defaultVenue from "../../assets/defaultVenue.webp";
import { BASE_URL_VENUES } from "../../utils/constants";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Switch, Button} from "@mui/material/";
import { ModalContext } from "../../context/modalContent";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
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
  Form
  
} from "./venueCreate.styles";

const VenueCreate = () => {
const theme = useTheme();

  const { setOpenModal, setModalInfo, setModalTitle } = useContext(ModalContext);
  const { token } = useContext(AuthContext);
  const [internet, setInternet] = useState(false);
  const [parkingSpace, setParkingSpace] = useState(false);
  const [breakfastMeal, setbreakfastMeal] = useState(false);
  const [petFriendly, setpetFriendly] = useState(false);

  const [media, setMedia] = useState([]);

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

  useEffect(() => {
    if (information && !isItLoading && !isItError) {
      setOpenModal(true);
      setModalTitle("Success!");
      setModalInfo("Venue was created");
    }
  }, [information, isItLoading, isItError]);

  const handleMediaInputChange = (event) => {
    const imageValue = event.target.value;
    if (imageValue.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/i)) {
      setMedia([...media, imageValue]);
      event.target.value = "";
    }
  };

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

  const previewData = watch();
  previewData.media = media;

  return (
    <BoxContainer className="App">
     <FormContainer>
  <Form id="venueForm" onSubmit={handleSubmit(onSubmit)}>
    <FieldContainer>
      <FormField
        name="name"
        label="Venue Name"
        type="text"
        register={register}
        errors={errors}
      />
    </FieldContainer>

    <FieldContainer>
      <FormField
        name="description"
        label="Venue Description"
        type="text"
        register={register}
        errors={errors}
      />
    </FieldContainer>

    <RowContainer>
      <FieldContainer>
        <FormField
          name="price"
          label="Price per night"
          type="text"
          register={register}
          errors={errors}
        />
      </FieldContainer>

      <FieldContainer>
        <FormField
          name="maxGuests"
          label="Maximum Guests"
          type="text"
          register={register}
          errors={errors}
        />
      </FieldContainer>
    </RowContainer>

    <RowContainer>
      <SwitchContainer>
        <FormControlLabel
          control={<Switch onChange={() => setInternet(!internet)} />}
          label="Wifi?"
        />
      </SwitchContainer>

      <SwitchContainer>
        <FormControlLabel
          control={<Switch onChange={() => setParkingSpace(!parkingSpace)} />}
          label="Parking?"
        />
      </SwitchContainer>

      <SwitchContainer>
        <FormControlLabel
          control={<Switch onChange={() => setbreakfastMeal(!breakfastMeal)} />}
          label="Breakfast?"
        />
      </SwitchContainer>

      <SwitchContainer>
        <FormControlLabel
          control={<Switch onChange={() => setpetFriendly(!petFriendly)} />}
          label="Pets?"
        />
      </SwitchContainer>
    </RowContainer>

    <MediaContainer>
      <FormField
        name="media"
        label="Media (Optional)"
        type="text"
        register={register}
        errors={errors}
        inputProps={{ onChange: handleMediaInputChange }}
      />
      {media.map((mediaItem, index) => (
        <div key={index}>
          <img src={mediaItem} alt={`Media ${index}`} />
          <button onClick={() => removeMedia(mediaItem)}>Remove</button>
        </div>
      ))}
    </MediaContainer>

    <FieldContainer>
      <FormField
        name="address"
        label="Address (Optional)"
        type="text"
        register={register}
        errors={errors}
      />
    </FieldContainer>

    <FieldContainer>
      <FormField
        name="city"
        label="City (Optional)"
        type="text"
        register={register}
        errors={errors}
      />
    </FieldContainer>

    <FieldContainer>
      <FormField
        name="zip"
        label="Zip Code (Optional)"
        type="text"
        register={register}
        errors={errors}
      />
    </FieldContainer>

    <FieldContainer>
      <FormField
        name="country"
        label="Country (Optional)"
        type="text"
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
    Price: {previewData.price},- | Max Guests: {previewData.maxGuests}
  </Typography>
) : "Price and Guest limit goes here"}
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
            }}
          >
  {previewData.description ? previewData.description : "Your description goes here"}
          </Typography>
          <ul>
                  <li>
                    <Tooltip
                      title="WiFi"
                      placement="right-end"
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <WifiIcon />
                    </Tooltip>
                    {internet ? (
                      <CheckIcon style={{ color: "green" }} />
                    ) : (
                      <ClearIcon style={{ color: "red" }} />
                    )}
                  </li>
                  <li>
                    <Tooltip
                      title="Parking"
                      placement="right-end"
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <LocalParkingIcon />
                    </Tooltip>
                    {parkingSpace ? (
                      <CheckIcon style={{ color: "green" }} />
                    ) : (
                      <ClearIcon style={{ color: "red" }} />
                    )}
                  </li>
                  <li>
                    <Tooltip
                      title="Breakfast"
                      placement="right-end"
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <FreeBreakfastIcon />
                    </Tooltip>
                    {breakfastMeal ? (
                      <CheckIcon style={{ color: "green" }} />
                    ) : (
                      <ClearIcon style={{ color: "red" }} />
                    )}
                  </li>
                  <li>
                    <Tooltip
                      title="Pets"
                      placement="right-end"
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <PetsIcon />
                    </Tooltip>
                    {petFriendly ? (
                      <CheckIcon style={{ color: "green" }} />
                    ) : (
                      <ClearIcon style={{ color: "red" }} />
                    )}
                  </li>
                </ul>
        </VenueInfoWrapper>
        <VenueImageWrapper>
          <img
            src={previewData.media[0] ? previewData.media[0] : defaultVenue}
            alt={previewData.name}
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              marginBottom: "1rem",
            }}
          />
        </VenueImageWrapper>
      </PreviewContainer>
    </BoxContainer>
  );
};

export default VenueCreate;
