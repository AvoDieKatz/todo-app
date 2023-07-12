import { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { fetchTodoList } from "../../services/TaskServices";

const TaskList = ({ option }) => {
    const [selected, setSelected] = useState(0);
    const handleSelect = (taskId) => setSelected(taskId);

    const {
        isLoading,
        isError,
        data: tasks,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: async () =>
            await fetchTodoList(option)
                .then((res) => res.data)
                .catch((err) => console.error(err)),
        staleTime: Infinity,
    });

    console.log(tasks);

    return (
        <>
            {isError ?? "Error!!!"}
            {isLoading ? (
                "Loading..."
            ) : (
                <ListGroup defaultActiveKey={selected}>
                    {tasks.map((task) => (
                        <ListGroup.Item
                            key={task.id}
                            action
                            active={selected === task.id}
                            onClick={() => handleSelect(task.id)}
                        >
                            {task.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
};

TaskList.propTypes = {
    option: PropTypes.string,
};

export default TaskList;
