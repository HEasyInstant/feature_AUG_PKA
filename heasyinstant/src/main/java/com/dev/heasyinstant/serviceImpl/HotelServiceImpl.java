package com.dev.heasyinstant.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.heasyinstant.entity.Hotel;
import com.dev.heasyinstant.repository.HotelRepository;
import com.dev.heasyinstant.service.HotelService;

@Service
public class HotelServiceImpl implements HotelService{

	@Autowired
	private HotelRepository hotelRepository;
	@Override
	public Hotel addHotel(Hotel hotel) {
		
		
		return hotelRepository.save(hotel);
	}

}
