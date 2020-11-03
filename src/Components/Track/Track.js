import React, { Component } from "react";
import "./Track.css";

let isRemoval;
export default class Track extends Component {

    constructor(props) {
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }

  renderAction() {
    if (isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}>-</button>;
    } else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>;
    }
  }

  removeTrack() {
      this.props.onRemove(this.props.track)
  }

  addTrack() {
      this.props.onAdd(this.props.track)
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            Artist: {this.props.track.artist} | Album: {this.props.track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
