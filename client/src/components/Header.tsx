import React from "react";
import "react-bootstrap";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import logo from "./logo.png";

export function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />{' '}
                ROZETKA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline action="/search/">
                    <FormControl name="q" type="text" placeholder="Search" className="mr-sm-2" />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}