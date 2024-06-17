import React, { useEffect, useState } from "react";
import Layout from "../../CommonComponent/Layout";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import SideBar from "./SideBar";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import Loading from "../../CommonComponent/Loading";
import { STATUSES, fetchAllBlog } from "../../Redux/Slice/AllBlogsslice";
import { useDispatch, useSelector } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AllBlogs = () => {
    const dispatch=useDispatch()

    const { data:allBlogs, status }=useSelector((state) => state?.allBlog)

    
      useEffect(() => {
       dispatch(fetchAllBlog());
         }, []);

if (status === STATUSES.ERROR) {
        return <h2>Something went wrong please check your Api cunnection!</h2>;
    } 

  return (
    <Layout>
      {status && <Loading />}
      {!status && (
        <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Item>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead >
                      <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="center">Photo</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allBlogs?.data?.map((blog,index) => (
                        <StyledTableRow key={blog._id}>
                          <StyledTableCell component="th" scope="row">
                            <h3>{blog.title}</h3>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            dangerouslySetInnerHTML={{
                              __html: blog.postText.slice(0, 200),
                            }}
                          />
                          <StyledTableCell align="center">
                            {{index} ? (
                              <CardMedia
                                component="img"
                                image={`https://restapinodejs.onrender.com/api/blog/image/${blog?._id}`}
                                alt={blog.title}
                                style={{
                                  width: "250px",
                                  height: "200px",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              
                              <Skeleton variant="rectangular" width={250} height={200} />
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Link to={`/blog-details/${blog._id}`}>
                              <Button variant="contained">
                                <VisibilityIcon />
                              </Button>
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <SideBar />
              </Item>
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default AllBlogs;
