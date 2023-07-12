import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { Card } from "react-bootstrap";
import { useContext } from "react";
import AddTaskForm from "../Forms/AddTaskForm";
import PropTypes from "prop-types";

const ContextAwareToggle = ({ eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <div className="d-grid my-2">
            <Button variant="outline-primary" onClick={decoratedOnClick}>
                {isCurrentEventKey ? "Cancle" : "Add Task"}
            </Button>
        </div>
    );
};

ContextAwareToggle.propTypes = {
    eventKey: PropTypes.string,
    callback: PropTypes.func,
};

const AddButton = () => {
    return (
        <Accordion>
            <ContextAwareToggle eventKey="0" />
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <AddTaskForm />
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    );
};
export default AddButton;
