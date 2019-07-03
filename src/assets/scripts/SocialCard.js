import React, {Component} from 'react';

class SocialCard extends Component {
  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this)
    // Set initial state for likes
    this.state = {
      likes: this.props.data['likes'],
      likeClass: "interactions__icon interactions__icon--heart"
    }
  }

  // Toggle like on/off function (Here we would update the data but for I'm just making a React component now so I'll just toggle it on the front end)
  toggleLike() {
    // If the state is equal to the data then the user has not liked
    if(this.state.likes == this.props.data['likes']) {
      // change the state to reflect the user's like
      this.setState({
        likes: this.props.data['likes'] + 1,
        likeClass: "interactions__icon interactions__icon--heart-liked"
      })
    }

    // Otherwise...
    else {
      // Reset like amounts to data value
      this.setState({
        likes: this.state.likes - 1,
        likeClass: "interactions__icon interactions__icon--heart"
      })
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card__user">
          <img
            src={this.props.data['thumbnail']}
            alt={this.props.data['user']}
            className="profile-pic"
          />
          <h5>{this.props.data['user']}</h5>
        </div>
        <div className="card__post">
          <p>{this.props.data['content']}</p>
        </div>
        <div className="card__image">
          <img
            src={this.props.data['image']}
            alt="Image alt text"
          />
        </div>
        <div className="card__info">
          <h4>{this.props.data['title']}</h4>
          <h6>{this.props.data['date']}</h6>
          <div className="interactions">
            <button
              className={this.state.likeClass}
              onClick={this.toggleLike}
            >
              {this.state.likes}
            </button>
            <button className="interactions__icon interactions__icon--comments">
              0
            </button>
            <button className="interactions__icon interactions__icon--share">
              0
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialCard;
