package com.rmit.sept.majorproject.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.time.DayOfWeek;
import java.util.Date;

@Entity
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
//    @Enumerated(EnumType.STRING)
//    private DayOfWeek dayOfWeek;
//    @JsonFormat(pattern = "HH:mm")
//    private LocalTime startTime;
//    @JsonFormat(pattern = "HH:mm")
//    private LocalTime endTime;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

//    public DayOfWeek getDayOfWeek() { return dayOfWeek; }
//
//    public void setDayOfWeek(DayOfWeek dayOfWeek) { this.dayOfWeek = dayOfWeek; }
//
//    public LocalTime getStartTime() { return startTime; }
//
//    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
//
//    public LocalTime getEndTime() { return endTime; }
//
//    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

}
