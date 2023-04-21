package ReservationServerBackend.Backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ReservationServerBackend.Backend.authentication.authMessages.RegisterRequest;
import ReservationServerBackend.Backend.entity.Court;
import ReservationServerBackend.Backend.entity.Reservation;
import ReservationServerBackend.Backend.entity.User;
import ReservationServerBackend.Backend.repository.CourtRepository;
import ReservationServerBackend.Backend.repository.ReservationRepository;
import ReservationServerBackend.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ReservationController {

    private final UserRepository userRepo;
    private final CourtRepository courtRepo;
    private final ReservationRepository reservationRepo;


    // REST Reservation

    @PostMapping("/add")
    @ResponseBody
    public String addReservation(Reservation reservation){
        //TODO logik, ist termin frei
        reservationRepo.save(reservation);
        return "ok";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Reservation> reservations(){
        return reservationRepo.findAll();
    }

    @GetMapping("/mine/{username}")
    @ResponseBody
    public List<Reservation> myReservation(@PathVariable String username){
        List<Reservation> reservations= new ArrayList<Reservation>();
        try{
         User u = userRepo.findByUsername(username).orElseThrow(null);
         reservations = u.getReservations();  
        }catch(Exception e){
            return reservations;
        }
        
        return reservations;
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public String deleteReservation(@RequestParam int id){
        try{
            reservationRepo.deleteById(id);
            return "ok";
        }catch (Exception e){
            return "erorr";
        }
    }

    // REST Courts

    @GetMapping("/courts")
    @ResponseBody
    public List<Court> courts(){
        return courtRepo.findAll();
    }

    @PostMapping("/addcourt")
    @ResponseBody
    public String editCourt(@RequestParam Court court){
        courtRepo.save(court);
        return "ok";
    }

    @DeleteMapping("/deletecourt")
    @ResponseBody
    public String deleteCourt(@RequestParam int id){
        courtRepo.deleteById(id);
        return "ok";
    }

    //++++++++++++REST USER +++++++++++
    @PostMapping("/register")
    @ResponseBody
    public String register(@RequestParam RegisterRequest ur){
        System.out.println(ur);
        try{
            User e = userRepo.findByUsername(ur.getUsername()).orElseThrow();
            return "username";
        }catch (Exception e){
            try{
                User e1 = userRepo.findByEmail(ur.getEmail()).orElseThrow();
                return "email";
            }catch (Exception ex){
                //TODO password encoder
                User u = User.builder()
                    .username(ur.getUsername())
                    .email(ur.getEmail())
                    .firstname(ur.getFirstname())
                    .lastname(ur.getLastname())
                    .password(ur.getPassword())
                    .build();
                userRepo.save(u);
                return "ok";
            }
        }
        
        
    }

    //Views
    
    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/reservation")
    public String reservation(){
        return "reservation";
    }

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
