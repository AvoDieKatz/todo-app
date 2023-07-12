import api from "../utils/api";

// export const fetchTodoList = async (option) =>
//         option
//             ? api.get(`/api/tasks?status=${option}`)
//             : api.get(`/api/tasks/list`);

export const fetchTodoList = async (option) =>
    api.get(`/api/tasks?status=${option}`);

export const fetchAllList = async () => api.get(`/api/tasks/list`);

export const createTask = async (request) => api.post(`/api/tasks`, request);
