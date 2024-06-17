import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, fetchCourse } from '../../Redux/Slice/Courseslice';
import axiosInstance from '../../Api/Axiosinstance';
import Layout from '../../CommonComponent/Layout';
import Loading from '../../CommonComponent/Loading';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

const Course = () => {
   
    const dispatch=useDispatch()

    const { data: courseData, status }=useSelector((state) => state?.course)

    
      useEffect(() => {
       
           dispatch(fetchCourse());
         
      }, []);

      
    
   
    // if (status === STATUSES.LOADING) {
    //     return <h2>Loading ....</h2>;
    // }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong please check your Api cunnection!</h2>;
    }

  return (
    <>
     <Layout>
        {status && <Loading/>}
      {!status &&<Container maxWidth="xl">
        <Typography variant="h4" align="center" gutterBottom>
          Our Courses
        </Typography>
        <Grid container spacing={2}>
          {courseData?.Courses?.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course._id}>
             
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={`https://restapinodejs.onrender.com/api/course/photo/${course._id}`}
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {course.name}
                      </Typography>
                      <Typography variant="h6" component="div" gutterBottom>
                        ₹{course.fees}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.duration}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" variant="contained" style={{marginLeft:"7rem"}}>
                      Buy now
                    </Button>
                  </CardActions> 
                </Card>
            
            </Grid>
          ))}
        </Grid>
      </Container>}
    </Layout>
    </>
  )
}

export default Course