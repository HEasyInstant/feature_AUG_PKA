package com.dev.heasyinstant.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.dev.heasyinstant.entity.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer>,QueryByExampleExecutor<Hotel>{

}
