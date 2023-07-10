package com.avocatdo.kickstart.system;

import com.avocatdo.kickstart.task.TaskStatus;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, TaskStatus> {
    @Override
    public TaskStatus convert(String source) {
        try {
            return TaskStatus.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException exception) {
            return null;
        }
    }
}
