package com.rmit.sept.majorproject.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;


@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private int duration;
    @ManyToOne(optional=false)
    User customer;
    @ManyToOne(optional=false)
    User worker;
    @JsonFormat(pattern ="yyyy-MM-dd-HH-mm")
    private Date startTime;
    @JsonFormat(pattern="yyyy-MM-dd-HH-mm")
    private Date endTime;

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
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
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime(){
        return endTime;
    }
    public void setEndTime(Date endTime){
        this.endTime = endTime;
    }
}
