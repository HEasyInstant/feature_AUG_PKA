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
@Table(name = "users")

public class User {
	public User() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	// private int hotel_id;
	private String fname;
	private String lname;
	private String fullname;
	private boolean status;
	private String username;
	private String password;
	// private int role_id;
	// private int contact_id;
	// private int address_id;
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
	int updated_by;

	/*
	 * @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "us2")
	 * 
	 * @JoinColumn(name = "address_id", referencedColumnName = "address_id",
	 * insertable = false, updatable = false) private Address adss;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "us1")
	 * 
	 * @JoinColumn(name = "contact_id", referencedColumnName = "contact_id",
	 * insertable = false, updatable = false) private Contact cont;
	 * 
	 * @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "u")
	 * 
	 * @JoinColumn(name = "role_id", referencedColumnName = "role_id", insertable =
	 * false, updatable = false) private Set<Role> r1 = new HashSet<>();
	 * 
	 * @ManyToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "hotel_id", referencedColumnName = "hotel_id", insertable
	 * = false, updatable = false) private Hotel hl;
	 * 
	 * @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "usss3")
	 * 
	 * @JoinColumn(name = "service_id", referencedColumnName = "service_id",
	 * insertable = false, updatable = false) private Set<Service> serv = new
	 * HashSet<>();
	 */
	

	
}
