package com.dev.heasyinstant.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name = "hotel")

public class Hotel {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int hotel_id;
	private String name;
	private String description;

	// private int licence_id;
	private String thumbnail_url;
	private boolean status;
	private boolean api_enabled;
	boolean api_key;
	private int parent_id;
	private int child_id;
	private String qr_code;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "created_date", nullable = true, updatable = false)
	@CreatedDate
	private Date created_date;
	int created_by;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "updated_date", nullable = true, updatable = false)
	@CreatedDate
	private Date updated_date;
	private int updated_by;
	// private int contact_id;
	// private int address_id;

	/*
	 * @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "h4")
	 * 
	 * @JoinColumn(name = "address_id", referencedColumnName = "address_id",
	 * insertable = false, updatable = false) private Address adss;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "h5")
	 * 
	 * @JoinColumn(name = "contact_id", referencedColumnName = "contact_id",
	 * insertable = false, updatable = false) private Contact cont;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "hl2")
	 * 
	 * @JoinColumn(name = "licence_id", referencedColumnName = "licence_id",
	 * insertable = false, updatable = false) private License lish;
	 * 
	 * @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "hl") private Set<User> us = new HashSet<>();
	 * 
	 * @OneToMany(cascade = CascadeType.ALL, mappedBy = "h6") private Set<Role> r3;
	 */
	
	
		



	
}
