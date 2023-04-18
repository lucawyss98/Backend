package ReservationServerBackend.Backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/reservation")
    public String reservation(){
        return "reservation";
    }

    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/register")
    public String register(){
        return "register";
    }

    @GetMapping("/user")
    public String user(){
        return "user";
    }


}
