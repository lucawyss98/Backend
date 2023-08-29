package Team7.ReservationServer.model;

import Team7.ReservationServer.controller.msgs.ReservationMsg;
import Team7.ReservationServer.controller.msgs.ServerResponseMsg;
import Team7.ReservationServer.entity.Court;
import Team7.ReservationServer.entity.Reservation;
import Team7.ReservationServer.entity.Sport;
import Team7.ReservationServer.entity.User;
import Team7.ReservationServer.repository.CourtRepository;
import Team7.ReservationServer.repository.ReservationRepository;
import Team7.ReservationServer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReservationModel {

    private final UserRepository userRepo;
    private final CourtRepository courtRepo;
    private final ReservationRepository reservationRepo;

    public ServerResponseMsg addReservation(ReservationMsg rMsg) {
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
            return new ServerResponseMsg("ok");
        }catch(Exception e){
            return new ServerResponseMsg("error");
        }

    }

    public List<Reservation> getUserReservations(String username) {

        List<Reservation> reservations= new ArrayList<Reservation>();

        try{
            User u = userRepo.findByUsername(username);
            reservations = u.getReservations();
        }catch(Exception e){
            return reservations;
        }
        return reservations;
    }

    public ServerResponseMsg deleteReservation(String id) {

        if(reservationRepo.existsById(Integer.parseInt(id))){
            reservationRepo.deleteById(Integer.parseInt(id));
            return new ServerResponseMsg("ok");
        }
        return new ServerResponseMsg("error");
    }

    public List<Sport> getSportOptions() {
        return Arrays.asList(Sport.values());
    }


}
