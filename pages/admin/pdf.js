import React from "react";
import Iframe from "react-iframe";

class PDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: ""
    };
  }

  render() {
    if (this.props.contentType === "UseCase") {
      return (
        <div>
          <Iframe
            url="../static/UseCase.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      );
    } else if (this.props.contentType === "PDF2") {
      return (
        <div>
          <Iframe
            url="../static/Arc-experis.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      );
    } else if (this.props.contentType === "PDF3") {
      return (
        <div>
          <Iframe
            url="../static/UseCase.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      );
    } else if (this.props.contentType === "PDF4") {
      return (
        <div>
          <Iframe
            url="../static/UseCase.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      );
    } else if (this.props.contentType === "PDF5") {
      return (
        <div>
          <Iframe
            url="../static/UseCase.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      );
    }
  }
}

export default PDF;
