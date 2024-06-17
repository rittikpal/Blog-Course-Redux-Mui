import React, { useEffect } from 'react'
import { fetchCategory } from '../../Redux/Slice/Categoryslice'
import { Box, Divider, List, ListItem, ListItemText, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from "@mui/material/Skeleton";
import { fetchRecentPostData } from '../../Redux/Slice/RecentPostSlice'
const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};
const SideBar = () => {
    const dispatch=useDispatch()

    const categories =useSelector((state) => state?.categ)
    const recentpost =useSelector((state) => state?.recentposts)

    useEffect(() => {
        dispatch(fetchCategory());
        dispatch(fetchRecentPostData());
    }, []);

   
   
    return (
        <>
        <List sx={style}>
          <ListItem
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "black",
            }}
          >
            <ListItemText primary="Category" />
          </ListItem>
          {categories?.data?.data?.map((categor) => {
            return (
              <>
                <ListItem sx={{textAlign:"center"}}>
                    <Link  to={`/category/${categor?._id}`} style={{ textDecoration: "none", color: "black" }}>{categor?.category}</Link>
                    </ListItem>
                <Divider component="li" />
              </>
            );
          })}
        </List>
        <h3 style={{color:"white",backgroundColor:"black"}}>Recent Posts</h3>
  
        <Box>
          { recentpost?.data?.data?.map((post, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{ marginBottom: 2, padding: 2 }}
            >
              <Box>
              {{index} ? (
                    <img
                      src={ `https://restapinodejs.onrender.com/api/blog/image/${post?._id}`}
                      alt={`Image for ${post?.title}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                   
                    <Skeleton variant="rectangular" width="100%" height={200} />
                  )}
              </Box>
              <Box sx={{ marginTop: 1 }}>
                <h6
                  style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}
                >
                  <Link to={`/blog-details/${post?._id}`} style={{color:"black"}}>
                    {post?.title}
                  </Link>
                </h6>
                <time
                  datetime={post?.date}
                  style={{ fontSize: "0.85rem", color: "#6c757d" }}
                >
                  {new Date(post?.createdAt).toLocaleDateString()} at {}
                   {new Date(post?.createdAt).toLocaleTimeString()}
                </time>
              </Box>
            </Paper>
          ))}
        </Box>
      </>
  )
}

export default SideBar