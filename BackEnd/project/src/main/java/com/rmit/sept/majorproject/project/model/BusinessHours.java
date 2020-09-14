package com.rmit.sept.majorproject.project.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalTime;
import java.time.DayOfWeek;

@Entity
public class BusinessHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name="business_id", nullable = false)
//    private Business business;
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

//    public Business getBusiness() { return business; }
//
//    public void setBusiness(Business business) { this.business = business; }

    public DayOfWeek getDayOfWeek() { return dayOfWeek; }

    public void setDayOfWeek(DayOfWeek dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public LocalTime getStartTime() { return startTime; }

    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }

    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
}