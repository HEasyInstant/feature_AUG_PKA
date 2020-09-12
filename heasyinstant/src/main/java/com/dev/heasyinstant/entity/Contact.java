package com.dev.heasyinstant.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;jjllllllll

@Data
@Entity
@Table(name = "contact")

public class Contact {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int contact_id;
	//private int user_id;
	private String primary_mobile;
	private String secondary_mobile;
	private String primar_landline;
	private String secondary_landline;
	private String fax_number;
	private String primary_email;
	private String secondary_email;
	private String contact_belongs_to;

	/*
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable =
	 * false, updatable = false)
	 * 
	 * private User us1;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL) private Hotel h5;
	 */
	

	
	


	
}
