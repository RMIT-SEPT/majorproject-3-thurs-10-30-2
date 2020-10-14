package com.rmit.sept.majorproject.project.model;

import javax.validation.constraints.NotNull;
import java.util.List;

public class WorkerHolder {
//    @NotNull
//    private User user;
    @NotNull
    private List<WorkerHours> workerHours;

//    public User getUser() { return user; }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

    public List<WorkerHours> getWorkerHours() {
        return workerHours;
    }

    public void setWorkerHours(List<WorkerHours> workerHours) {
        this.workerHours = workerHours;
    }
}
