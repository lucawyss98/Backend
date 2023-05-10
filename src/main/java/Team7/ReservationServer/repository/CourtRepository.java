package Team7.ReservationServer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Team7.ReservationServer.entity.Court;

public interface CourtRepository extends JpaRepository<Court, Integer>{
    
    
    Optional<Court> findByName(String name);
}
