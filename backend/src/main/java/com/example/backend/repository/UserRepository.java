package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.cassandra.repository.CassandraRepository;

public interface UserRepository extends CassandraRepository<User, String> {
    User findByUsernameAndPassword(String username, String password);
}
