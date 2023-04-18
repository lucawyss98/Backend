package ReservationServerBackend.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ReservationServerBackend.Backend.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
    

}
