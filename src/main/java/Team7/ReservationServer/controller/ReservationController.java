package Team7.ReservationServer.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import Team7.ReservationServer.controller.msgs.ServerResponseMsg;
import Team7.ReservationServer.model.ReservationModel;
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
    private final ReservationModel model = new ReservationModel();

    // REST Reservation

    @PostMapping("/add")
    @ResponseBody
    public ServerResponseMsg addReservation(@RequestBody ReservationMsg rMsg){
        
        try{
            model.addReservation(rMsg);
            return new ServerResponseMsg("ok");
        }catch(Exception e){
            return new ServerResponseMsg("error");
        }
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
    public ServerResponseMsg deleteReservation(@RequestBody String id){

        if(reservationRepo.existsById(Integer.parseInt(id))){
            reservationRepo.deleteById(Integer.parseInt(id));
            return new ServerResponseMsg("ok");
        }
        return new ServerResponseMsg("error");
            
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
        return courtRepo.findAll();
    }

    @PostMapping("/addcourt")
    @ResponseBody
    public ServerResponseMsg editCourt(@RequestBody Court c){
        courtRepo.save(c);
        return new ServerResponseMsg("ok");
    }
    
    @DeleteMapping("/deletecourt")
    @ResponseBody
    public ServerResponseMsg deleteCourt(@RequestBody String id){
        courtRepo.deleteById(Integer.parseInt(id));
        return new ServerResponseMsg("ok");
    }

    //++++++++++++REST USER +++++++++++
    @PostMapping("/register")
    @ResponseBody
    public ServerResponseMsg register(@RequestBody RegisterRequest rr){
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

    //++++++++Views+++++++++++++
    
    @GetMapping("/")
    public String index(){
        return "index";
    }

}
