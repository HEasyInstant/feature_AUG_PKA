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
@Table(name = "item")

public class Item {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int itemid;
	private String itemname;
	private int qantity;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "created_at", nullable = true, updatable = true)
	@CreatedDate
	private Date createdAt;

	/*
	 * @ManyToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "orderid", referencedColumnName = "orderid", insertable =
	 * false, updatable = false)
	 * 
	 * private Order od;
	 */
	
	

	

}
