import React, { useEffect } from 'react'
import  { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import MessageIcon from '@mui/icons-material/Message';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCommentSectionData } from '../../Redux/Slice/CommentSlice';


const CommentSection = ({id}) => {
    const dispatch=useDispatch()
    const commentData=useSelector((state)=>state?.commentSection?.data?.post?.comment?.comments)
    
    const initialCommentLimit=0
    const loadPerClick=10
    const [commentLimit,setCommentLimit]=useState(initialCommentLimit)
  
    const handleLoadMore=()=>{
        setCommentLimit((prev)=>prev+loadPerClick)
    }
    useEffect(()=>{
        dispatch(fetchCommentSectionData(id))
    },[dispatch,id])
   // console.log(commentData,status);

    return (
        <>
          {!commentLimit==0 && <Typography variant="h5" gutterBottom style={{marginTop:"1rem"}}>
          <MessageIcon />
            Comments:
          </Typography>}
          {
          commentData?.slice().reverse().slice(initialCommentLimit,commentLimit).map((comment) => (
            <Paper
              key={comment._id}
              variant="outlined"
              style={{ padding: "10px", marginBottom: "10px" }}
            >
              <Box   
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              >
                
                <Box
                  width={40}
                  height={40}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#e0f7fa"
                  borderRadius="50%"
                  style={{ marginRight: "10px" }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{ color: "#00796b", fontWeight: "bold" }}
                  >
                    {comment.name.charAt(0)}
                  </Typography>
                </Box>
    
                {/* Commenter name */}
                <Typography variant="h6" style={{ marginRight: "10px" }}>
                  {comment.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ marginRight: "10px" }}
                >
                  {comment.email}
                </Typography>
    
                {/* Comment date */}
                <Typography variant="caption" color="textSecondary">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
    
              {/* Comment text */}
              <Typography variant="body1" style={{ marginTop: "5px" }}>
                {comment.comment}
              </Typography>
            </Paper>
          ))}
           <Button variant="contained" onClick={handleLoadMore} style={{marginLeft: "1rem",marginTop:"1rem"}}>{commentLimit===0?<><MessageIcon/> View Comments({commentData?.length})</>:"Load More"}</Button>
        </>
     
      );
}

export default CommentSection
