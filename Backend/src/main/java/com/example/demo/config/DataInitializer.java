package com.example.demo.config;

import com.example.demo.model.ServiceItem;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.repository.ServiceItemRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ServiceItemRepository serviceItemRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        seedServices();
        seedUsers();
    }

    private void seedServices() {
        if (serviceItemRepository.count() > 0) return;

        serviceItemRepository.save(ServiceItem.builder().name("Electrician").description("Electrical repair and installation").active(true).build());
        serviceItemRepository.save(ServiceItem.builder().name("Plumber").description("Plumbing repair and installation").active(true).build());
        serviceItemRepository.save(ServiceItem.builder().name("AC Repair").description("Air conditioner service").active(true).build());
        serviceItemRepository.save(ServiceItem.builder().name("Carpenter").description("Furniture repair and door fixing").active(true).build());
    }

    private void seedUsers() {
        createUserIfAbsent("9876543210", "Venkatesh", "password123", UserRole.USER);
        createUserIfAbsent("admin", "Admin", "admin123", UserRole.ADMIN);
        createUserIfAbsent("worker1", "Worker One", "worker123", UserRole.WORKER);
    }

    private void createUserIfAbsent(String mobile, String name, String password, UserRole role) {
        if (userRepository.findByMobile(mobile).isEmpty()) {
            userRepository.save(User.builder()
                    .name(name)
                    .mobile(mobile)
                    .password(password)
                    .role(role)
                    .build());
        }
    }
}
