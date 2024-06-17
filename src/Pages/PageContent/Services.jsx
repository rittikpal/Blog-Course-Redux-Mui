import React, { useEffect } from 'react'
import { STATUSES, fetchService } from '../../Redux/Slice/Servicesslice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';

const Services = () => {
    const dispatch=useDispatch()

    const { data: services, status }=useSelector((state) => state?.service)

   
    useEffect(() => {
        dispatch(fetchService())
    }, []);

   
    if (status === STATUSES.LOADING) {
        return <h2>Loading ....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong please check your Api cunnection!</h2>;
    }
  return (
   <>
     <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
        Services
      </Typography>
            <Grid container spacing={3}>
                {services?.data?.map((serviceData) => (
                    <Grid item xs={12} sm={6} md={4} key={serviceData?.id}>
                        <Card sx={{ height: "15rem", padding: "1rem" }}>
                            <CardContent>
                                <Typography variant="h5" color="text.primary" gutterBottom>
                                    {serviceData?.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {serviceData?.details}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
   </>
  )
}

export default Services