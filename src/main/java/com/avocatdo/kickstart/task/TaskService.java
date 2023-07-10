package com.avocatdo.kickstart.task;

import com.avocatdo.kickstart.task.requests.NewTaskRequest;
import com.avocatdo.kickstart.task.requests.UpdateTaskRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Iterable<Task> getTaskList() {
        return taskRepository.findAll();
    }

    public Iterable<Task> getTaskListByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    public Optional<Task> getTaskById(Integer id) {
        return taskRepository.findById(id);
    }

    public Task addTask(NewTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.title());
        task.setEstimated(request.estimated());
        task.setStatus(TaskStatus.ACTIVE);
        task.setCreatedAt(LocalDateTime.now());
        taskRepository.save(task);
        return task;
    }

    public Optional<Task> updateTask(UpdateTaskRequest request, Integer id) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()) {
            Task t = task.get();
            t.setTitle(request.title());
            t.setStatus(request.status());
            t.setActual(request.actual());
            taskRepository.save(t);
        }
        return task;
    }

    public Optional<Task> deleteTask(Integer id) {
        Optional<Task> optional = taskRepository.findById(id);
        if(optional.isPresent()) {
            taskRepository.deleteById(id);
        }
        return optional;
    }

}
