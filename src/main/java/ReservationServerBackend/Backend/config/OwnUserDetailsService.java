package ReservationServerBackend.Backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import ReservationServerBackend.Backend.entity.User;
import ReservationServerBackend.Backend.repository.UserRepository;

@Component
public class OwnUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);

        if(user == null){
            throw new UsernameNotFoundException("Username: " + username + "not found");
        }
        return new OwnUserDetails(user);
        //return user.map(OwnUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not Found: " + username));
        
    }

}
