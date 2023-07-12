import { Col, Container, Row, ToastContainer, Toast } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import HorizontalTabs from "../components/Navigation/HorizontalTabs";
import { useAlert } from "../hooks/useAlert";

const AppLayout = () => {
    const { openSuccess, openFailure, openWarning, message, close } =
        useAlert();
    return (
        <>
            <span className="display-6 position-absolute">Todo App</span>

            <ToastContainer position="top-center" style={{ marginTop: 16 }}>
                <Toast
                    show={openSuccess}
                    autohide={true}
                    delay={3000}
                    onClose={close}
                    className="align-items-center text-bg-success border-0"
                >
                    <Toast.Body>{message} </Toast.Body>
                </Toast>
                <Toast
                    show={openFailure}
                    autohide={true}
                    delay={3000}
                    onClose={close}
                    className="align-items-center text-bg-danger border-0"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
                <Toast
                    show={openWarning}
                    autohide={true}
                    delay={3000}
                    onClose={close}
                    className="align-items-center text-bg-warning border-0"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Container className="w-50">
                <Row>
                    <Col>
                        <HorizontalTabs />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AppLayout;
