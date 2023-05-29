import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/formfield/Formfield";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { venueSchema } from "../../utils/yupSchema";
import useApi from "../../hooks/useApi";
import useCallApi from "../../hooks/useCallApi";
import { AuthContext } from "../../context/auth";
import { Typography, useTheme } from "@mui/material";
import defaultVenue from "../../assets/defaultVenue.webp";
import { BASE_URL_VENUES } from "../../utils/constants";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Switch, Button} from "@mui/material/";
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
  Form
  
} from "./venueCreate.styles";
import Metas from "../../components/Metas";
import Loader from "../../components/Loader";
import Errorer from "../../components/Errorer";

const VenueCreate = () => {
const theme = useTheme();
const { id } = useParams();
const { data, isLoading, isError } = useApi(
    BASE_URL_VENUES + id);
    console.log(data);
  const { setOpenModal, setModalInfo, setModalTitle } = useContext(ModalContext);
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
    setValue,
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("maxGuests", data.maxGuests);
      setInternet(data.meta.wifi);
      setParkingSpace(data.meta.parking);
      setbreakfastMeal(data.meta.breakfast);
      setpetFriendly(data.meta.pets);
      setMedia(data.media);
      setValue("address", data.location.address);
      setValue("city", data.location.city);
      setValue("country", data.location.country);
      setValue("zip", data.location.zip);
      
      // Set other form fields using setValue
    }
  }, [data, setValue]);

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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: JSON.stringify(modifiedData),
    };
    await startFetch(BASE_URL_VENUES + id, options);
   
  };

  useEffect(() => {
    if (information && !isItLoading && !isItError) {
      setOpenModal(true);
      setModalTitle("Success!");
      setModalInfo("Venue was Modified!");
    }
  }, [information, isItLoading, isItError, setOpenModal, setModalInfo, setModalTitle]);

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

  if (isLoading) {
    return <Loader />
  }

  if (!token) {
    return (
      <div className="App">
        <p>Please log in before trying to edit a venue</p>
      </div>
    );
  }

  if (!userInfo?.venueManager) {
    return (
      <div className="App">
        <p>Only Venue managers can edit venues.</p>
      </div>
    );
  }


  if (isError) {
    return <Errorer />
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
          control={<Switch onChange={() => setInternet(!internet)} checked={internet} />}
          label="Wifi?"
        />
      </SwitchContainer>

      <SwitchContainer>
        <FormControlLabel
          control={<Switch onChange={() => setParkingSpace(!parkingSpace)} checked={parkingSpace} />}
          label="Parking?"
        />
      </SwitchContainer>

      <SwitchContainer>
        <FormControlLabel
          control={<Switch onChange={() => setbreakfastMeal(!breakfastMeal)} checked={breakfastMeal} />}
          label="Breakfast?"
        />
      </SwitchContainer>

      <SwitchContainer>
        <FormControlLabel
          control={<Switch onChange={() => setpetFriendly(!petFriendly)} checked={petFriendly}/>}
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
  {previewData.name ? previewData.name : data?.name || "Your venue name goes here"}
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
  {previewData.description ? previewData.description : data?.description || "Your description goes here"}
          </Typography>
<Metas path={metaCollection} />
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
