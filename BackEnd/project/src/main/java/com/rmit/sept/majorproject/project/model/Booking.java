package com.rmit.sept.majorproject.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;


@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private int duration;

    //    @JsonIgnore
//    @OneToOne(optional=false)
    @NotNull
    private User.AccountType customer;

    //    @JsonIgnore
//    @OneToOne(optional=false)
    @NotNull
    private User.AccountType worker;

    @JsonFormat(pattern = "yyyy-MM-dd:HH-mm")
    private Date startTime;

    @JsonFormat(pattern = "yyyy-MM-dd:HH-mm")
    private Date endTime;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;

    public Booking() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public User.AccountType getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = User.AccountType.CUSTOMER;
    }

    public User.AccountType getWorker() {
        return worker;
    }

    public void setWorker(User worker) {
        this.worker = User.AccountType.WORKER;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }

}
