import React from "react";
import Media from "react-bootstrap/lib/Media";
import { Glyphicon } from 'react-bootstrap';
import ToggleDisplay from 'react-toggle-display';

export default class Character extends React.Component {

    constructor() {
      super();
      this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        this.props.onClick(this.props.id);
    }

    render(){
        var cls = 'Character ' + (this.props.favorite ? 'favorite' : '');
        return (
            <Media>
              <Media.Left align="top">
                <div className={cls} onClick={this.clickHandler}>
                  <img width={200} height={200} src={this.props.src} alt="Image" title={this.props.title} style = {{"cursor": "pointer"}}/>
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>{this.props.title}
                  <ToggleDisplay show={this.props.favorite}>
                    <Glyphicon glyph="star" />
                  </ToggleDisplay>
                </Media.Heading>
                <p>{this.props.description}</p>
              </Media.Body>
            </Media>
        );
    }
};

// Character.propTypes = { initialShow: React.propTypes.bool };
// Character.defaultProps = { initialShow: true };
