import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const HorizontalTabs = () => {
    const location = useLocation();
    const page = location.pathname;

    return (
        <Nav fill justify variant="underline" defaultActiveKey={page} className="mb-4 gap-0">
            <Nav.Item>
                <Nav.Link eventKey="/" as={Link} to="/">
                    Timer
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/list" as={Link} to="/list">
                    Tasks
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/report" as={Link} to="/report">
                    Report
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
export default HorizontalTabs;
