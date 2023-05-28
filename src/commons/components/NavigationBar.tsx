import { onSignout } from "@/services";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/channel">Channel</Nav.Link>
            <Nav.Link href="/message">Message</Nav.Link>
          </Nav>
          <Button onClick={onSignout} variant="outline-light">Signout</Button>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavigationBar;
