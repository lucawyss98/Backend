package ReservationServerBackend.Backend.controller.msgs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddCourtMsg {

    private String name;
    private String sport;
    private int openTime;
    private int closeTime;
    
}
