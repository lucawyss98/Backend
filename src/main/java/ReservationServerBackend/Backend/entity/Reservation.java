package ReservationServerBackend.Backend.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Reservation {
    
    @Id
    @GeneratedValue
    private int id;
    private int duration;
    private Date date;
    private List<Integer> timeslots;


    @ManyToOne
    @JoinColumn(name = "court_id", nullable= false)
    private Court court_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable=false)
    private User user_id;

    
}
