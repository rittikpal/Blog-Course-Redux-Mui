import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, fetchBanner } from '../../Redux/Slice/Bannerslice';
import Loading from '../../CommonComponent/Loading'
import { Box, Button } from '@mui/material';
import Team from './Team';
import Services from './Services';
import Testimonial from './Testimonial';
import Layout from '../../CommonComponent/Layout'
const Home = () => {
    const dispatch=useDispatch()

    const { data: banners, status }=useSelector((state) => state?.banner)

   
    useEffect(() => {
        dispatch(fetchBanner())
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
        {status && <Loading />}
        {!status && (
          <>
            {" "}
            <Box sx={{ overflow: "hidden" }}>
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-ride="carousel"
              >
              
                <ol className="carousel-indicators">
                  {banners?.bannerdata?.map((_, index) => (
                    <li
                      key={index}
                      data-target="#carouselExampleCaptions"
                      data-slide-to={index}
                      className={index === 0 ? "active" : ""}
                    ></li>
                  ))}
                </ol>

                <div className="carousel-inner">
                  {banners?.bannerdata?.map((item, index) => (
                    <div
                      key={item._id}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={`https://restapinodejs.onrender.com/api/banner/photo/${item._id}`}
                        className="d-block w-100"
                        alt={item.title}
                        style={{ height: "100vh", objectFit: "cover" }}
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        <Button
                          variant="contained"
                          color="primary"
                          href={item.link}
                        >
                          {item.buttonText || "Read More"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

               
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-target="#carouselExampleCaptions"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-target="#carouselExampleCaptions"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </button>
              </div>
            </Box>
            <Team withLayout={false} />
            <Services />
            <Testimonial withLayout={false} />
          </>
        )}
      </Layout>
    </>
  )
}

export default Home