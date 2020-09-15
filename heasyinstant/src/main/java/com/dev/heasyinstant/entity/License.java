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
@Table(name = "license")

public class License {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int licence_id;
	private String name;
	private int cost;
	private String discription;
	private String allowed_option;
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
	/*
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "hotel_id", referencedColumnName = "hotel_id", insertable
	 * = false, updatable = false)
	 * 
	 * private Hotel hl2;
	 */

	
	
	


}
