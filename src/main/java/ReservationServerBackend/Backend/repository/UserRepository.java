package ReservationServerBackend.Backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import ReservationServerBackend.Backend.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);
    
}
