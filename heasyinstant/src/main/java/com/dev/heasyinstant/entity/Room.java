package com.dev.heasyinstant.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="room")
public class Room {
	
    @Id
	int roomno;
	int hotel_id;
	String discription;
	String type;
	String floor;
	
}
