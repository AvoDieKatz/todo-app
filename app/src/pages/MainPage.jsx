import { Col, Row } from "react-bootstrap";
import TaskList from "../components/Tasks/TaskList";
import Timer from "../components/Timer/Timer";
import { TaskStatus } from "../enums/TaskStatus";
import AddButton from "../components/Buttons/AddButton";

const MainPage = () => {
    return (
        <>
            <Row className="g-0">
                <Col className="p-2">
                    <TaskList option={TaskStatus.ACTIVE} />
                    <AddButton />
                </Col>
                <div className="vr"></div>
                <Col xs={8}>
                    <div
                        className="d-flex justify-content-center align-content-center"
                        style={{ minHeight: 360 }}
                    >
                        <Timer />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default MainPage;
