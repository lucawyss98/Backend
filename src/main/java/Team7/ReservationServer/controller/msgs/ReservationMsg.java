package Team7.ReservationServer.controller.msgs;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReservationMsg {

    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
    private String courtName;
    private String username;

}
