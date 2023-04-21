package ReservationServerBackend.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ReservationServerBackend.Backend.repository.CourtRepository;
import ReservationServerBackend.Backend.repository.ReservationRepository;
import ReservationServerBackend.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class BackendApplication {

	final UserRepository userRepo;
    final CourtRepository courtRepo;
    final ReservationRepository reservationRepo;	

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

	}

}
