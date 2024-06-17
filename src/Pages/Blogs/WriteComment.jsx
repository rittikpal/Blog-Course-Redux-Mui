import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";
import { addComment, fetchCommentSectionData } from "../../Redux/Slice/CommentSlice";

const WriteComment = ({ blogId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isPosting, setIsPosting] = useState(false);

    const dispatch=useDispatch()
  const onSubmit = async (commentData) => {
    const upData={
      name: commentData.name,
      email: commentData.email,
      comment:commentData.comment
    }
    setIsPosting(true);
   // console.log(commentData,blogId);
    
    try {
        dispatch(addComment({blogId,upData}))
        reset()
       dispatch(fetchCommentSectionData(blogId))
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsPosting(false);
    }
  };

 
  return (
    <Box mt={4}>
      <h1>Write your Comment:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("name", { required: true })}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", { required: true })}
        />
        <TextField
          label="Write a comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("comment", { required: true })}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isPosting}
          style={{ marginTop: "1rem" }}
        >
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

export default WriteComment;


