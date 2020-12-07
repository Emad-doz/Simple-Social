import axios from 'axios';

class PostService {
    constructor() {
      this.service = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true,
      });
    }

    create = (id) => {
      return this.service
         .post(`/api/posts/new/${id}`)
         .then((response) => response);
    }

    listByUser = (id) => {
      return this.service
        .get(`api/posts/by/${id}`)
        .then((response) => response);
    }

    listNewsFeed = ({userId}) => {
      return this.service
        .get(`api/posts/feed/${userId}`)
        .then((response) => response);
    }
    
    remove = (id) => {
      return this.service
        .delete(`api/posts/${id}`)
        .then((response) => response);
    }

    like = () => {
      return this.service
        .put('api/posts/like')
        .then((response) => response);
    }

    unlike = () => {
      return this.service
        .put('api/posts/unlike')
        .then((response) => response);
    }

    comment = () => {
      return this.service
        .put('api/posts/comment')
        .then((response) => response);
    }

    uncomment = () => {
      return this.service
        .put('api/posts/uncomment')
        .then((response) => response);
    }
}

export default PostService
