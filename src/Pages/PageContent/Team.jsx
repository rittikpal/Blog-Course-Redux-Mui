import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, fetchTeam } from '../../Redux/Slice/Teamslice';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Layout from '../../CommonComponent/Layout';
import Loading from '../../CommonComponent/Loading';


const Team = ({ withLayout = true }) => {
    const dispatch=useDispatch()

    const { data: teams, status }=useSelector((state) => state?.team)

   
    useEffect(() => {
        dispatch(fetchTeam())
    }, []);

   
    // if (status === STATUSES.LOADING) {
    //     return <h2>Loading ....</h2>;
    // }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong please check your Api cunnection!</h2>;
    }

    const teamContent = (
    <>
     <Typography variant="h4" align="center" gutterBottom>
        Our Team
      </Typography>
      <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
        <Grid container spacing={2}>
          {teams?.TeamMember?.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member._id}>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://restapinodejs.onrender.com/api/team/photo/${member._id}`}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.possession}
                    </Typography>
                  </CardContent>
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
        {status && <Loading />}
        {!status && teamContent}
      </Layout>
    );
  } else {
    return teamContent;
  }
}

export default Team