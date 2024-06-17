import {configureStore} from '@reduxjs/toolkit'
import Servicesslice from '../Slice/Servicesslice'
import Teamslice from '../Slice/Teamslice'
import Testimonialslice from '../Slice/Testimonialslice'
import Bannerslice from '../Slice/Bannerslice'
import Courseslice from '../Slice/Courseslice'
import Contactslice from '../Slice/Contactslice'
import Categoryslice from '../Slice/Categoryslice'
import AllBlogsslice from '../Slice/AllBlogsslice'
import Blogsbycategoryslice from '../Slice/Blogsbycategoryslice'
import Blogdetailslice from '../Slice/Blogdetailslice'
import RecentPostSlice from '../Slice/RecentPostSlice'
import LikeSlice from '../Slice/LikeSlice'
import DisLikeSlice from '../Slice/DisLikeSlice'
import CommentSlice from '../Slice/CommentSlice'
import { AuthSlice } from '../Slice/AuthSlice'




const Store=configureStore({
  reducer:{
    service:Servicesslice,  
    team:Teamslice ,
    testimonial:Testimonialslice,
    banner:Bannerslice,
    course:Courseslice,
    contact:Contactslice,
    categ:Categoryslice,
    recentposts:RecentPostSlice,
    allBlog:AllBlogsslice,
    blogsCategory:Blogsbycategoryslice,
    blogsDetail:Blogdetailslice,
    likes:LikeSlice,
    dislike: DisLikeSlice,
    commentSection:CommentSlice,
    auth:AuthSlice.reducer
  }  
})

export default Store