import React from "react";
import { Navbar, Nav, NavItem, MenuItem, Modal, Button } from 'react-bootstrap';
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';

export default class Header extends React.Component {

  constructor() {
    super();
    this.allCharacters = this.allCharacters.bind(this);
    this.favoriteCharacters = this.favoriteCharacters.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      showModal: false
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  //TODO: Comunicate between two components remove handler CSS
  allCharacters(){
    $(".Characters").show();
    $(".favorites").hide();
  }

  //TODO: Comunicate between two components, remove handler CSS
  favoriteCharacters(){
    $(".Characters").hide();
    $(".favorites").show();
  }

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect class="navbar navbar-default navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Marvel Cards</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={this.allCharacters}>All characters</NavItem>
            <NavItem eventKey={2} href="#" onClick={this.favoriteCharacters}>Favorite characters</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#" onClick={this.openModal}>About</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Marvel Cards</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>v0.1.0</h4>
            <p>André Augusto Machado</p>
            <p>andremachadobauru@gmail.com</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
      </Modal>
      </div>
    );
  }
}
