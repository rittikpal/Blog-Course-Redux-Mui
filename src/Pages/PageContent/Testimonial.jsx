import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonial } from '../../Redux/Slice/Testimonialslice';
import { STATUSES } from '../../Redux/Slice/Testimonialslice';
import { Avatar, Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import Layout from '../../CommonComponent/Layout';
import Loading from '../../CommonComponent/Loading';

const Testimonial = ({ withLayout = true }) => {
    const dispatch=useDispatch()

    const { data: testimonialData, status }=useSelector((state) => state?.testimonial)

   
    useEffect(() => {
        dispatch(fetchTestimonial())
    }, []);

   
    // if (status === STATUSES.LOADING) {
    //     return <h2>Loading ....</h2>;
    // }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong please check your Api cunnection!</h2>;
    }
    const testimonialContent = (
   <>
   <Container maxWidth="xl" sx={{ marginTop: 4 }}>
    <Typography variant="h4" align="center" gutterBottom>
        What Our Clients Say
    </Typography>
    <Grid container spacing={4}>
        {testimonialData?.testimonials?.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member._id}>
                <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
                    <CardActionArea>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
                            <Avatar
                                src={`https://restapinodejs.onrender.com/api/testimonials/photo/${member._id}`}
                                alt={member.name}
                                sx={{ width: 150, height: 150, marginBottom: 2 }}
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="h6" gutterBottom>
                                    {member.name}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    {member.position}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                                    "{member.talk}"
                                </Typography>
                            </CardContent>
                        </Box>
                    </CardActionArea>
                </Card>
            </Grid>
        ))}
    </Grid>
</Container>
</>
  );
  if (withLayout) {
    return (
        <Layout>
            {status && <Loading/>}
            {!status && testimonialContent}
        </Layout>
    );
} else {
    return testimonialContent;
}
}

export default Testimonial