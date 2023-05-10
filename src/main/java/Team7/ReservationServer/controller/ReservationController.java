package Team7.ReservationServer.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import Team7.ReservationServer.controller.msgs.RegisterRequest;
import Team7.ReservationServer.controller.msgs.ReservationMsg;
import Team7.ReservationServer.entity.Court;
import Team7.ReservationServer.entity.Reservation;
import Team7.ReservationServer.entity.Role;
import Team7.ReservationServer.entity.Sport;
import Team7.ReservationServer.entity.User;
import Team7.ReservationServer.repository.CourtRepository;
import Team7.ReservationServer.repository.ReservationRepository;
import Team7.ReservationServer.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ReservationController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final CourtRepository courtRepo;
    private final ReservationRepository reservationRepo;

    // REST Reservation

    @PostMapping("/add")
    @ResponseBody
    public String addReservation(@RequestBody ReservationMsg rMsg){
        
        try{
            User u = userRepo.findByUsername(rMsg.getUsername());
            Court c = courtRepo.findByName(rMsg.getCourtName()).orElseThrow();
            Reservation r = Reservation.builder()
                .court_id(c)
                .user_id(u)
                .startTime(rMsg.getStartTime())
                .endTime(rMsg.getEndTime())
                .date(rMsg.getDate())
                .build();
            reservationRepo.save(r);
            return "ok";
        }catch(Exception e){
            return "error";
        }
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Reservation> reservations(){
        List<Reservation> res =reservationRepo.findAll();
        return res;
    }

    @GetMapping("/mine/{username}")
    @ResponseBody
    public List<Reservation> myReservation(@PathVariable String username){

        List<Reservation> reservations= new ArrayList<Reservation>();

        try{
         User u = userRepo.findByUsername(username);
         reservations = u.getReservations();  
        }catch(Exception e){
            return reservations;
        }
        
        return reservations;
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public String deleteReservation(@RequestBody String id){

        if(reservationRepo.existsById(Integer.parseInt(id))){
            reservationRepo.deleteById(Integer.parseInt(id));
            return "ok";
        }
        return "error";
            
    }

    // REST Courts

    @GetMapping("/sports")
    @ResponseBody
    public List<Sport> getSport(){
        return Arrays.asList(Sport.values());
    }

    @GetMapping("/courts")
    @ResponseBody
    public List<Court> courts(){
        List<Court> c = courtRepo.findAll();
        return c;
    }

    @PostMapping("/addcourt")
    @ResponseBody
    public String editCourt(@RequestBody Court c){
        courtRepo.save(c);
        return "ok";
    }
    
    @DeleteMapping("/deletecourt")
    @ResponseBody
    public String deleteCourt(@RequestBody String id){
        courtRepo.deleteById(Integer.parseInt(id));
        return "ok";
    }

    //++++++++++++REST USER +++++++++++
    @PostMapping("/register")
    @ResponseBody
    public String register(@RequestBody RegisterRequest rr){
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
                return "ok";
            }
            return "username";
        }
        return "email";       
    }

/*     @PostMapping("/auth")
    @ResponseBody
    public String authenticate(@RequestBody LoginRequest login){
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
        if(authenticate.isAuthenticated()){
            return jwtService.generateToken(login.getUsername());
        }else{
            throw new UsernameNotFoundException("Invalid Userlogin");
        }
    } */

    //++++++++Views+++++++++++++
    
    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/reservation")
    public String reservation(){
        return "reservation";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/register")
    public String register(){
        return "register";
    }

    @GetMapping("/user")
    public String user(){
        return "user";
    }

}
