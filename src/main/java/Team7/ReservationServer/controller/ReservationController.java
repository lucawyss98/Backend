package Team7.ReservationServer.controller;

import java.util.List;

import Team7.ReservationServer.controller.msgs.ServerResponseMsg;
import Team7.ReservationServer.model.CourtModel;
import Team7.ReservationServer.model.ReservationModel;
import Team7.ReservationServer.model.UserModel;
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
@Controller("/api")
public class ReservationController {

    private final UserRepository userRepo;

    private final CourtRepository courtRepo;
    private final ReservationRepository reservationRepo;
    private final ReservationModel reservationModel = new ReservationModel();
    private final CourtModel courtModel = new CourtModel();
    private final UserModel userModel = new UserModel();

    // REST Reservation

    @PostMapping("/add")
    @ResponseBody
    public ServerResponseMsg addReservation(@RequestBody ReservationMsg rMsg){
        return reservationModel.addReservation(rMsg);
    }


    @GetMapping("/mine/{username}")
    @ResponseBody
    public List<Reservation> myReservation(@PathVariable String username){
        return reservationModel.getUserReservations(username);
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public ServerResponseMsg deleteReservation(@RequestBody String id){
        return reservationModel.deleteReservation(id);
    }

    // REST Courts

    @GetMapping("/sports")
    @ResponseBody
    public List<Sport> getSport(){
        return reservationModel.getSportOptions();
    }

    @GetMapping("/courts")
    @ResponseBody
    public List<Court> courts(){
        return courtModel.findAll();
    }

    @PostMapping("/addcourt")
    @ResponseBody
    public ServerResponseMsg editCourt(@RequestBody Court c){
        return courtModel.addCourt(c);
    }
    
    @DeleteMapping("/deletecourt")
    @ResponseBody
    public ServerResponseMsg deleteCourt(@RequestBody String id){
        return courtModel.deleteCourt(id);
    }

    //++++++++++++REST USER +++++++++++
    @PostMapping("/register")
    @ResponseBody
    public ServerResponseMsg register(@RequestBody RegisterRequest rr){
        return userModel.register(rr);
    }

    //++++++++Views+++++++++++++
    


}
