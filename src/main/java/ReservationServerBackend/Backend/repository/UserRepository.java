package ReservationServerBackend.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ReservationServerBackend.Backend.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{

    User findByUsername(String username);

    User findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);
    
}
