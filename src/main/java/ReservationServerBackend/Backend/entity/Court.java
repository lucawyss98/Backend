package ReservationServerBackend.Backend.entity;

import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class Court {
    
    @Id
    @GeneratedValue
    private int id;
    private String name;

    @Enumerated(EnumType.STRING)
    private Sport sport;

    private LocalTime openTime;
    private LocalTime closeTime;
    
    @JsonIgnoreProperties("court_id")
    @OneToMany(mappedBy = "court_id")
    private List<Reservation> reservations;

    public Court(String name, String sport, LocalTime opentime, LocalTime closetime){
        this.name = name;
        this.sport = Sport.valueOf(sport);
        this.openTime = opentime;
        this.closeTime = closetime;
    }
}
