package com.avocatdo.kickstart.task.requests;

import com.avocatdo.kickstart.task.TaskStatus;

public record UpdateTaskRequest(String title, int actual, TaskStatus status) {
}
