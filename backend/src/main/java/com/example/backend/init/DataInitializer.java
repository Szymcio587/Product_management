package com.example.backend.init;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsById("admin")) {
            User user = new User("admin", "admin", "admin@example.com");
            userRepository.save(user);
            System.out.println("Admin user inserted.");
        }
    }
}