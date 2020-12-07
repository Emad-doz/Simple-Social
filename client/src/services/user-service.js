import axios from 'axios';

class UserService {
    constructor() {
      this.service = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true,
      });
    }

    list = () => {
        return this.service
          .get('api/users', {})
          .then((response) => response.data);
    }

    read = ({id}) => {
        return this.service
          .get(`api/users/${id}`) 
    }

    update = (id) => {
        return this.service
          .put(`api/users/${id}`)
    }

    delete = (id) => {
        return this.service
          .delete(`api/users/${id}`)
    }

    findPeople = ({userId}) =>{
        return this.service
          .get(`api/users/findpeople/${userId}`)
    }

    follow = () => {
        return this.service
          .put('api/users/follow')
    }

    unfollow = () => {
        return this.service
          .put('api/users/unfollow')
    }
}

export default UserService;