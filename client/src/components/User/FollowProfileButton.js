import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import UserService from '../../services/user-service'

const service = new UserService();

function FollowProfileButton (props) {
  const followClick = () => {
    props.onButtonClick(service.follow)
  }
  const unfollowClick = () => {
    props.onButtonClick(service.unfollow)
  }
    return (<div>
      { props.following
        ? (<Button variant="contained" color="secondary" onClick={unfollowClick}>Unfollow</Button>)
        : (<Button variant="contained" color="primary" onClick={followClick}>Follow</Button>)
      }
    </div>)
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
}

export default  FollowProfileButton