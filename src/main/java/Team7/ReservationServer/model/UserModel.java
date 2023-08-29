package Team7.ReservationServer.model;

import Team7.ReservationServer.controller.msgs.RegisterRequest;
import Team7.ReservationServer.controller.msgs.ServerResponseMsg;
import Team7.ReservationServer.entity.Role;
import Team7.ReservationServer.entity.User;
import Team7.ReservationServer.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserModel {

    private final PasswordEncoder encoder;
    private final UserRepository userRepo;

    public ServerResponseMsg register(RegisterRequest rr) {

        if(!userRepo.existsByEmail(rr.getEmail())){
            if(!userRepo.existsByUsername(rr.getUsername())){
                User u = User.builder()
                        .username(rr.getUsername())
                        .email(rr.getEmail())
                        .firstname(rr.getFirstname())
                        .lastname(rr.getLastname())
                        .password(encoder.encode(rr.getPassword()))
                        .role(Role.USER)
                        .build();
                userRepo.save(u);
                return new ServerResponseMsg("ok");
            }
            return new ServerResponseMsg("username");
        }
        return new ServerResponseMsg("email");
    }
}
