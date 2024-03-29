package Team7.ReservationServer.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;

    @JsonIgnoreProperties("reservations")
    @ManyToOne
    @JoinColumn(name = "court_id", nullable= false)
    private Court court_id;

    @JsonIgnoreProperties("reservations")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable=false)
    private User user_id;

}
