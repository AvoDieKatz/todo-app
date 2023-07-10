package com.avocatdo.kickstart.task;

import com.avocatdo.kickstart.task.requests.NewTaskRequest;
import com.avocatdo.kickstart.task.requests.UpdateTaskRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("list")
    public @ResponseBody Iterable<Task> getAllTaskList() {
        return taskService.getTaskList();
    }

    @GetMapping
    public ResponseEntity<Iterable<Task>> getTaskList(@RequestParam(value = "status", defaultValue = "active") TaskStatus status) {
        // Using ResponseEntity - Static Method way
        return ResponseEntity.ok(taskService.getTaskListByStatus(status));
    }

    @GetMapping("{taskId}")
    public ResponseEntity<Task> getTaskDetail(@PathVariable("taskId") Integer id) {
        return ResponseEntity.ok(
                taskService.getTaskById(id).orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find task id: " + id)
                )
        );
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody NewTaskRequest request) {
        // Using ResponseEntity - Object way
        return new ResponseEntity<>(taskService.addTask(request), HttpStatus.CREATED);
    }

    @PutMapping("{taskId}")
    public ResponseEntity<Task> updateTask(@RequestBody UpdateTaskRequest request,
                           @PathVariable("taskId") Integer id) {
        // Using ResponseEntity - Static Method way
        return ResponseEntity.ok(
                taskService.updateTask(request, id).orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find task id: " + id)
                )
        );

    }

    @DeleteMapping("{taskId}")
    public ResponseEntity<Task> deleteTask(@PathVariable("taskId") Integer id) {
        taskService.deleteTask(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find task id: " + id)
        );
        // Using ResponseEntity - Builder way
        return ResponseEntity.noContent().build();
    }
}
