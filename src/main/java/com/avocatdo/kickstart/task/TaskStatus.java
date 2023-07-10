package com.avocatdo.kickstart.task;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum TaskStatus {
    @JsonProperty("active")
    ACTIVE,
    @JsonProperty("postponed")
    POSTPONED,
    @JsonProperty("done")
    DONE
}
