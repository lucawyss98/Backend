package ReservationServerBackend.Backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ReservationServerBackend.Backend.entity.Court;
import ReservationServerBackend.Backend.entity.Reservation;
import ReservationServerBackend.Backend.entity.User;
import ReservationServerBackend.Backend.repository.CourtRepository;
import ReservationServerBackend.Backend.repository.ReservationRepository;
import ReservationServerBackend.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ReservationController {

    private final UserRepository userRepo;
    private final CourtRepository courtRepo;
    private final ReservationRepository reservationRepo;

    // REST Reservation

    @PostMapping("/add")
    public String addReservation(Reservation reservation){
        //TODO logik, ist termin frei
        reservationRepo.save(reservation);
        return "ok";
    }

    @GetMapping("/all")
    public List<Reservation> reservations(){
        return reservationRepo.findAll();
    }

    @GetMapping("/{username}")
    public List<Reservation> myReservation(@PathVariable String username){
        User u = userRepo.findByUsername(username).orElseThrow();
        return u.getReservations();
    }

    @DeleteMapping("/delete")
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
    public List<Court> courts(){
        return courtRepo.findAll();
    }

    @PostMapping("/addcourt")
    public String editCourt(@RequestParam Court court){
        courtRepo.save(court);
        return "ok";
    }

    @DeleteMapping("/deletecourt")
    public String deleteCourt(@RequestParam int id){
        courtRepo.deleteById(id);
        return "ok";
    }


    


}
