package com.dev.heasyinstant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dev.heasyinstant.entity.AddGuest;


@Repository
public interface AddGuestRepository extends JpaRepository <AddGuest,Integer>{

}
