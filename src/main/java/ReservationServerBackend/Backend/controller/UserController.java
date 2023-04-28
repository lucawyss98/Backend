package ReservationServerBackend.Backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ReservationServerBackend.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserController {
    
    private final UserRepository userRepo;

}
