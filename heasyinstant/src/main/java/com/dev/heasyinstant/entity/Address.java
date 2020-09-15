package com.dev.heasyinstant.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "address")

public class Address {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int address_id;
	//private int user_id;
	private String addressline1;
	private String addressline2;
	private String city;
	private String state;
	private int pincode;
	private String country;
	private String address_belongs_to;
	/*
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable =
	 * false, updatable = false)
	 * 
	 * private User us2
	 */;

	
	
	
	/*
	 * @OneToOne(cascade = CascadeType.ALL) private Hotel h4;
	 */
	
	
	
}
