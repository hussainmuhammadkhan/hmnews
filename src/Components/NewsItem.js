import React, { Component } from "react";
// import PropTypes from 'prop-types'

export default class NewsItem extends Component {
  //   static propTypes = {
  //     prop: PropTypes
  //   }

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://static.politico.com/74/17/0a07ec4d475fbc128d08ce3a2a4f/teaser.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="Hi"
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-primary" style={{left: '85%', zIndex:'1'}}>
                {source}
              </span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {date ? new Date(date).toGMTString() : "Unknown Date"}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
