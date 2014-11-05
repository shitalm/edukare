/** @jsx React.DOM */

var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;

var brand = <a href="index.html" className="navbar-brand">Edukare</a>;

var navInstance = (
    <Navbar componentClass={React.DOM.header} inverse
        staticTop role="banner" brand={brand} toggleNavKey={0}
        className="bs-docs-nav" fluid>
        <Nav role="navigation" key={0} className="bs-navbar-collapse">
            <NavItem key={1} href="index.html">Home</NavItem>
            <NavItem key={2} href="student.html">Student</NavItem>
            <NavItem key={3} href="#">Resources</NavItem>
            <NavItem key={4} href="aboutus.html">About Us</NavItem>
        </Nav>
    </Navbar>
);

React.renderComponent(
    navInstance,
    document.getElementById('navigation')
);

