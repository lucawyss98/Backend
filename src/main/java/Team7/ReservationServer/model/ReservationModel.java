package Team7.ReservationServer.model;

import Team7.ReservationServer.controller.msgs.ReservationMsg;
import Team7.ReservationServer.entity.Court;
import Team7.ReservationServer.entity.Reservation;
import Team7.ReservationServer.entity.User;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ReservationModel {

    public void addReservation(ReservationMsg rMsg) {
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
    }
}
