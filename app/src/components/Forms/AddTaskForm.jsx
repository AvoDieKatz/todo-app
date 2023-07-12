import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/TaskServices";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAlert } from "../../hooks/useAlert";

const AddTaskForm = () => {
    const [isDirty, setDirty] = useState(false);
    const triggerDirty = () => setDirty(true);
    const titleInputRef = useRef(null);
    const estimateInputRef = useRef(null);

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: (tasks) => createTask(tasks),
        onSuccess: (res) => queryClient.invalidateQueries("todos"),
    });

    const { handleSuccess, setMessage } = useAlert();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("title: ", titleInputRef.current.value);
        console.log("estimate: ", estimateInputRef.current.value);
        setMessage("New Task Added!");
        handleSuccess();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TitleInput inputRef={titleInputRef} triggerDirty={triggerDirty} />
            <EstimateInput
                inputRef={estimateInputRef}
                triggerDirty={triggerDirty}
            />
            <div className="d-grid mt-1">
                <Button
                    variant="outline-primary"
                    type="submit"
                    disabled={!isDirty}
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
};

const TitleInput = ({ inputRef, triggerDirty }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
                placeholder="New Task..."
                ref={inputRef}
                onChange={triggerDirty}
            />
        </Form.Group>
    );
};

const EstimateInput = ({ inputRef, triggerDirty }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Estimated</Form.Label>
            <Form.Control
                type="number"
                placeholder="120..."
                ref={inputRef}
                onChange={triggerDirty}
            />
            <Form.Text className="text-muted ">
                <i>Estimated time should be in minutes.</i>
            </Form.Text>
        </Form.Group>
    );
};

TitleInput.propTypes = {
    inputRef: PropTypes.object,
    triggerDirty: PropTypes.func,
};

EstimateInput.propTypes = {
    inputRef: PropTypes.object,
    triggerDirty: PropTypes.func,
};

export default AddTaskForm;
