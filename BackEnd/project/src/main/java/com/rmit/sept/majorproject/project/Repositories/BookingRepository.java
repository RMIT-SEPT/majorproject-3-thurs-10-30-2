package com.rmit.sept.majorproject.project.Repositories;

import com.rmit.sept.majorproject.project.model.Booking;
import org.springframework.data.repository.CrudRepository;

public interface BookingRepository extends CrudRepository<Booking, Long> {
}
