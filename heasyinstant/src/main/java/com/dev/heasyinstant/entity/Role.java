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
@Table(name = "role")

public class Role {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int role_id;
	private String name;
	private String discription;
	//private int hotel_id;
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
	/*
	 * @ManyToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable =
	 * false, updatable = false) private User u;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "hotel_id", referencedColumnName = "hotel_id", insertable
	 * = false, updatable = false) private Hotel h6;
	 * 
	 * 
	 * @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "r")
	 * 
	 * private Set<Previlege> pre = new HashSet<>();
	 * 
	 */

	
	
	
	

}
