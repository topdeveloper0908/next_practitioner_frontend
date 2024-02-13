"use client"
import React, {useState} from 'react';

import { toast } from 'react-toastify';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function SignUp() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    const [step, setStep] = useState(1);
    const [sex, setSex] = useState('');
    const [type, setType] = useState('');

    const sexChange = (event) => {
        setSex(event.target.value);
    };
    const typeChange = (event) => {
        setType(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var formData = {
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            email: data.get('email'),
            phone: data.get('phone')
        }
        if(step == 0) {
            setStep(1);
        }
    }
    
  return (
    <Grid container spacing={0}>
        <Grid item md={6}>
            <Box height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <img src="../img/logo-1.png" alt="logo" width="300" />
                </Box>
                <Box mt={4}>
                    <iframe style={{width: '500px', height: '281px', borderRadius:'.3rem'}} src="https://player.vimeo.com/video/67733848?title=0&amp;byline=0&amp;portrait=0&amp;color=44b4ad"></iframe>
                </Box>
                <Box mt={4} display='flex' justifyContent='center' alignItems='center'>
                    <img style={{borderRadius: '50%', border: '5px solid rgb(157,157,157)', margin: '0 2rem'}} src="https://biohackingcongress.com/storage/users/June2023/9Q67Ebbs5rPLWWmWGZET.png" alt="Avatar" width="180" />
                    <Box>
                        <Typography mb={2} variant='h4' fontWeight='600' align='center'>Nima Farshid, CEO</Typography>
                        <Typography align='center' maxWidth='30rem'>"Let's together change the way the world looks at health and wellness by creating an integrative holistic network of consumers, holistic practitioners, and wellness centers."</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
        <Grid item md={6} bgcolor='#f3f6f8'>
            <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
                <Box component="form" onSubmit={handleSubmit} sx={{maxWidth: '30rem'}} bgcolor='white' className='shadow' p={4}>
                    {
                        step == 0 ? <>
                            <Typography my={4} variant='h5' fontWeight='600' align='center'>Apply to become a Gaia Healer and feature your practice!</Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                name="firstname"
                                autoComplete="firstname"
                                autoFocus
                                type='text'
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
                                type='text'
                            />
                            <TextField
                                margin="normal"
                                size='small'
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type='email'
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
                                type='text'
                            />
                        </> : <>
                            <Stack direction='row' spacing={2}>
                                <FormControl fullWidth size='small'>
                                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                                    <Select
                                        size='small'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={sex}
                                        label="Sex"
                                        onChange={sexChange}
                                    >
                                        <MenuItem value='Male'>Male</MenuItem>
                                        <MenuItem value='Female'>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth size='small'>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Type"
                                        onChange={typeChange}
                                    >
                                        <MenuItem value='In-person'>In-Person</MenuItem>
                                        <MenuItem value='Remote'>Remote</MenuItem>
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
                                type='text'
                            />
                            <Stack direction='row' spacing={2} mt={1}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="city"
                                    autoFocus
                                    type='text'
                                    size="small"
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
                                    type='text'
                                    size="small"
                                />
                            </Stack>
                            <Stack direction='row' spacing={2} mt={2}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="zipcode"
                                    label="Zipcode"
                                    name="zipcode"
                                    autoComplete="zipcode"
                                    autoFocus
                                    type='text'
                                    size="small"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="country"
                                    autoComplete="country"
                                    autoFocus
                                    type='text'
                                    size="small"
                                />
                            </Stack>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                defaultValue='linkImage'
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="linkImage" control={<Radio />} label="Use Image Link" />
                                <FormControlLabel value="customImage" control={<Radio />} label="Use Custom Image" />
                            </RadioGroup>
                            <TextField
                                required
                                size="small"
                                fullWidth
                                id="imageLink"
                                label="Image URL"
                                name="imageLink"
                                autoComplete="imageLink"
                                autoFocus
                                type='text'
                            />
                            <TextField
                                required
                                size="small"
                                fullWidth
                                id="imageLink"
                                name="imageLink"
                                autoComplete="imageLink"
                                autoFocus
                                type='file'
                            />
                            <TextField
                                required
                                size="small"
                                fullWidth
                                id="specialty"
                                name="specialty"
                                label="Select Specialty"
                                autoComplete="specialty"
                                autoFocus
                                type='text'
                            />
                        </>
                    }
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Grid>
    </Grid>
  );
}