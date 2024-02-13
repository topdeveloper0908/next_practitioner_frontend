"use client";
import React, { use, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function SignUp() {
  // const { data, error } = useSWR(
  //   "https://trial.mobiscroll.com/content/countries.json",
  //   fetcher
  // );
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://trial.mobiscroll.com/content/countries.json")
      .then((res) => res.json())
      .then((data) => {
        data = [...data, { value: "CA", text: "Canada", group: "C" }];
        data.sort((a, b) => a.text.localeCompare(b.text));
        setCountries(data);
      });
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleContinue = () => {
    setStep(1);
  };

  const [step, setStep] = useState(0);
  const [imageType, setImageType] = useState("linkImage");
  const [specialityModalOpen, setSpecialityModalOpen] = useState(false);

  // yup
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string().required("Phone is required and must be a number"),
    sex: Yup.string(),
    availability: Yup.string().required(),
    address: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string(),
    zipcode: Yup.string().required(),
    country: Yup.string().required(),
    imageLink: Yup.string(),
    specialty: Yup.string().required(),
    tags: Yup.string().required(),
  });

  // formik
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    sex: "Male",
    type: "",
    availability: "In-person",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "US",
    imageLink: "",
    specialty: "",
    tags: "",
  };

  const handleSubmit = async (values) => {
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (res.status === 200) {
      toast.success("Your application has been submitted successfully!");
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Grid container spacing={0}>
      <Grid item md={6}>
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src="../img/logo-1.png" alt="logo" width="300" />
          </Box>
          <Box mt={4}>
            <iframe
              style={{ width: "500px", height: "281px", borderRadius: ".3rem" }}
              src="https://player.vimeo.com/video/67733848?title=0&amp;byline=0&amp;portrait=0&amp;color=44b4ad"
            ></iframe>
          </Box>
          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              style={{
                borderRadius: "50%",
                border: "5px solid rgb(157,157,157)",
                margin: "0 2rem",
              }}
              src="https://biohackingcongress.com/storage/users/June2023/9Q67Ebbs5rPLWWmWGZET.png"
              alt="Avatar"
              width="180"
            />
            <Box>
              <Typography mb={2} variant="h4" fontWeight="600" align="center">
                Nima Farshid, CEO
              </Typography>
              <Typography align="center" maxWidth="30rem">
                "Let's together change the way the world looks at health and
                wellness by creating an integrative holistic network of
                consumers, holistic practitioners, and wellness centers."
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={6} bgcolor="#f3f6f8">
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ maxWidth: "30rem" }}
            bgcolor="white"
            className="shadow"
            p={4}
          >
            {step == 0 ? (
              <>
                <Typography
                  my={4}
                  variant="h5"
                  fontWeight="600"
                  align="center"
                  color={"black"}
                >
                  Apply to become a Gaia Healer and feature your practice!
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  autoFocus
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  autoFocus
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                <TextField
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </>
            ) : (
              <>
                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Sex"
                      name="sex"
                      onChange={formik.handleChange}
                      value={formik.values.sex}
                    >
                      <MenuItem value="Male" selected>
                        Male
                      </MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Type"
                      name="avauilability"
                      onChange={formik.handleChange}
                      value={formik.values.availability}
                    >
                      <MenuItem value="In-person">In-Person</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <TextField
                  margin="normal"
                  required
                  size="small"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  autoFocus
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <Stack direction="row" spacing={2} mt={1}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    autoFocus
                    type="text"
                    size="small"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    autoComplete="state"
                    autoFocus
                    type="text"
                    size="small"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  />
                </Stack>
                <Stack direction="row" spacing={2} mt={2}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="zipcode"
                    label="Zipcode"
                    name="zipcode"
                    autoComplete="zipcode"
                    autoFocus
                    type="text"
                    size="small"
                    onChange={formik.handleChange}
                    value={formik.values.zipcode}
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      margin="normal"
                      required
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      autoComplete="country"
                      placeholder="Select Country"
                      autoFocus
                      type="text"
                      size="small"
                      onChange={formik.handleChange}
                      value={formik.values.country}
                    >
                      {countries.map((country) => (
                        <MenuItem
                          value={country.value}
                          selected={country.value === "US"}
                        >
                          {country.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack my={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue="linkImage"
                    name="row-radio-buttons-group"
                    onChange={(e) => setImageType(e.target.value)}
                  >
                    <FormControlLabel
                      value="linkImage"
                      control={<Radio />}
                      label="Use Image Link"
                      name="imageType"
                    />
                    <FormControlLabel
                      value="customImage"
                      control={<Radio />}
                      label="Use Custom Image"
                      name="imageType"
                    />
                  </RadioGroup>
                </Stack>
                {imageType === "linkImage" ? (
                  <Stack my={2}>
                    <TextField
                      required
                      size="small"
                      fullWidth
                      id="imageLink"
                      label="Image URL"
                      name="imageLink"
                      autoComplete="imageLink"
                      autoFocus
                      type="text"
                    />
                  </Stack>
                ) : (
                  <Stack my={2}>
                    <TextField
                      required
                      size="small"
                      fullWidth
                      id="imageLink"
                      name="imageLink"
                      autoComplete="imageLink"
                      autoFocus
                      type="file"
                    />
                  </Stack>
                )}
                <Stack my={2}>
                  <TextField
                    required
                    size="small"
                    fullWidth
                    id="specialty"
                    name="specialty"
                    label="Select Specialty"
                    autoComplete="specialty"
                    autoFocus
                    type="text"
                    onClick={() => setSpecialityModalOpen(true)}
                  />
                </Stack>
                <Stack my={2}>
                  <TextField
                    required
                    size="small"
                    fullWidth
                    id="tags"
                    name="tags"
                    label="Tags"
                    autoComplete="tags"
                    autoFocus
                    type="text"
                  />
                </Stack>
              </>
            )}
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                type={step === 0 ? "button" : "button"}
                onClick={step === 0 ? handleContinue : null}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {step === 0 ? "Next" : "Sign Up"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <SpecialityModal
        open={specialityModalOpen}
        handleClose={() => setSpecialityModalOpen(false)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: 24,
        }}
        countries={countries}
      />
    </Grid>
  );
}

function SpecialityModal({ open, handleClose, style, countries }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 450 }}>
        <h3
          id="parent-modal-title"
          style={{
            padding: "20px",
          }}
        >
          Select Speciality
        </h3>
        <Divider component={"div"} fullWidth />
        <select
          class="selectpicker mb-2"
          data-actions-box="true"
          multiple
          data-width="100%"
          data-title="Select Specialty"
        >
          {countries.map((country) => (
            <option value={country.value}>{country.text}</option>
          ))}
        </select>
        <Box
          style={{
            padding: "15px",
          }}
        ></Box>
      </Box>
    </Modal>
  );
}
