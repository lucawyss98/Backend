package Team7.ReservationServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Team7.ReservationServer.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
    

}
