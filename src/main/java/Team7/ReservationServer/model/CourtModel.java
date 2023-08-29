package Team7.ReservationServer.model;

import Team7.ReservationServer.controller.msgs.ServerResponseMsg;
import Team7.ReservationServer.entity.Court;
import Team7.ReservationServer.repository.CourtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CourtModel {

    private final CourtRepository courtRepo;

    public List<Court> findAll() {
        return courtRepo.findAll();
    }

    public ServerResponseMsg addCourt(Court c) {
        courtRepo.save(c);
        return new ServerResponseMsg("ok");
    }

    public ServerResponseMsg deleteCourt(String id) {
        courtRepo.deleteById(Integer.parseInt(id));
        return new ServerResponseMsg("ok");
    }
}
