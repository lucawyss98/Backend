package ReservationServerBackend.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ReservationServerBackend.Backend.entity.Court;

public interface CourtRepository extends JpaRepository<Court, Integer>{
    
}
