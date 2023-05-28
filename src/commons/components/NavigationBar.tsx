import { onSignout } from "@/services";
import { useRouter } from "next/router";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  const router = useRouter();
  const isMessagePage = router.pathname.startsWith('/message/');
  const title = router.pathname;
  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>{title}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/channel">Channel</Nav.Link>
          </Nav>
          <Button disabled={isMessagePage} onClick={onSignout} variant="outline-light">Signout</Button>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavigationBar;
