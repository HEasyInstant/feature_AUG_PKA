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
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name = "orderitem")

public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderid;
	private String guestname;
	private String mobileno;
	private String order_status;

	private int hotel_id;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "created_at", nullable = true, updatable = true)
	@CreatedDate
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "updated_at", nullable = true, updatable = true)
	@LastModifiedDate
	private Date updatedAt;

	/*
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "guestcode", referencedColumnName = "guestcode",
	 * insertable = false, updatable = false)
	 * 
	 * private AddGuest adg;
	 * 
	 * @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "od")
	 * 
	 * private Set<Item> item = new HashSet<>();
	 */

	


	
	
	


}
