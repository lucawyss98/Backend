package ReservationServerBackend.Backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ReservationServerBackend.Backend.entity.Court;

public interface CourtRepository extends JpaRepository<Court, Integer>{
    
    Optional<Court> findByName(String name);
}
