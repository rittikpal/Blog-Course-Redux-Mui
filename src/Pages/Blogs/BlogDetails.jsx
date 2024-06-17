import React, { useEffect, useState } from "react";
import Layout from "../../CommonComponent/Layout";

import { useParams } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import WriteComment from "./WriteComment"
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Loading from "../../CommonComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchblogsdetails } from "../../Redux/Slice/Blogdetailslice";
import { fetchNoOfLikes } from "../../Redux/Slice/LikeSlice";
import { fetchNoOfDisLikes } from "../../Redux/Slice/DisLikeSlice";
import CommentSection from "./CommentSection";


const BlogDetails = () => {
 
 
  const dispatch=useDispatch()

  const { data: blogsDetails, status }=useSelector((state) => state?.blogsDetail)
  const likes = useSelector((state) => state.likes.data.likes);
  const dislikes = useSelector((state) => state.dislike.data.unlikes);

  const { id } = useParams()
  const handleLikeClick = () => {
    dispatch(fetchNoOfLikes(id));
  };

  const handleDislikeClick =  () => {
    dispatch(fetchNoOfDisLikes(id));
  };
    useEffect(() => {
     
         dispatch(fetchblogsdetails(id));
         dispatch(fetchNoOfLikes(id));
         dispatch(fetchNoOfDisLikes(id));
    }, []);

   // if (status === STATUSES.LOADING) {
  //     return <h2>Loading ....</h2>;
  // }

  if (status === STATUSES.ERROR) {
      return <h2>Something went wrong please check your Api cunnection!</h2>;
  }
 
 
 return (
    <Layout>
      {status && (
       <Loading/>
      )}
      {!status && (
        <Container maxWidth="xl">
          <Paper
            elevation={3}
            style={{
              padding: "1rem 3rem",
              marginTop: "1rem",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <CssBaseline />
            <Box mt={4}>
            <img

                      src={`https://restapinodejs.onrender.com/api/blog/image/${blogsDetails?._id}`}
                      alt={blogsDetails?.title}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  
                  <Typography variant="h3" mt={3} mb={2}>
                    {blogsDetails?.title}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogsDetails?.postText,
                      }}
                    />
                  </Typography>
             
                  <Box mt={2}>
                <Button variant="contained" color="primary"  onClick={handleLikeClick}>
                  <ThumbUpIcon style={{ marginRight: "8px" }} />
                  Like({likes})
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "1rem" }}
                  onClick={handleDislikeClick}
                >
                  <ThumbDownIcon style={{ marginRight: "8px" }} />
                  Dislike({dislikes})
                </Button>
                <CommentSection id={id} />
              </Box>
              <WriteComment blogId={id} />
            </Box>
          </Paper>
        </Container>
      )}
    </Layout>
  );
};

export default BlogDetails;
