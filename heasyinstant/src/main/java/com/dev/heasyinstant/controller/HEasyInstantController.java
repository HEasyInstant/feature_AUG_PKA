package com.dev.heasyinstant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.dev.heasyinstant.entity.Hotel;
import com.dev.heasyinstant.entity.User;
import com.dev.heasyinstant.service.HotelService;

//@RestController
@Controller
public class HEasyInstantController {

	@Autowired
	private HotelService hotelService;

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home() {
		return "layout";
	}

	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public String admin() {

		return "admin";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String home(Model m) {

		m.addAttribute("user", new User());

		return "login";
		// return "home2";
	}

	@RequestMapping("/loginagain")
	public String submitForm(@Validated @ModelAttribute("user") User u, BindingResult br) {
		if (br.hasErrors()) {
			return "login";
		} else {
			return "validuser";
		}
	}

	@PostMapping("/addHotel")
	@ResponseBody
	ResponseEntity<String> addHotel(@RequestBody Hotel hotel) {
		hotelService.addHotel(hotel);
		return ResponseEntity.status(HttpStatus.OK).body("Successfully stored in the DB...");
	}

}
