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

    @JsonIgnore
    @OneToOne(optional=false)
    User customer;

    @JsonIgnore
    @OneToOne(optional=false)
    User worker;

    @JsonFormat(pattern ="yyyy-MM-dd-HH-mm")
    private Date dateTime;

    public Booking(){

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

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public User getWorker() {
        return worker;
    }

    public void setWorker(User worker) {
        this.worker = worker;
    }

    public Date getStartTime() {
        return dateTime;
    }

    public void setStartTime(Date startTime) {
        this.dateTime = startTime;
    }
}
