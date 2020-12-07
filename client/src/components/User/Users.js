import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserServices from '../../services/user-service'

function Users (){
    const [users, setUsers] = useState([])

    const service = new UserServices();

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    service.list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
        <div>
            <h3>All Users</h3>
                <ul>
                {users.map((item, i) => {
                    return (
                    <Link to={"/user/" + item._id} key={i}>
                    <h4>{item.name}</h4>
                    </Link>
                    )
             })
           }
      </ul>
    </div>
  )
}

export default Users;