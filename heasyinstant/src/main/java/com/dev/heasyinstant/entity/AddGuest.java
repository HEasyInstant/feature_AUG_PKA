package com.dev.heasyinstant.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
//import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name = "addguest")

public class AddGuest implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer guestcode;
	/*
	 * @Lob
	 * 
	 * @Basic(fetch = FetchType.LAZY)
	 */
	private String guestname;
	private String mobileno;

	@Column(nullable = false, unique = true)
	private int roomno;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "checked_In", nullable = true, updatable = false)
	@CreatedDate
	private Date checkedIn;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "checked_out", nullable = true, updatable = true)
	@LastModifiedDate
	private Date checkedOut;
	private String gender;

	
	/*
	 * @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "adg")
	 * 
	 * private Order ord;
	 * 
	 */
	

	
}
