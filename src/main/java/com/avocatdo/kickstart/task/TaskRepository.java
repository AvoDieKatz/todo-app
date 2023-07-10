package com.avocatdo.kickstart.task;

import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer> {
    Iterable<Task> findByStatus(TaskStatus status);
}
