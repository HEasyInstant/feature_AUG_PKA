package com.dev.heasyinstant.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;;

@Data
@Entity
@Table(name = "serviceitem")
public class ServiceItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int serviceitem_id;
	private String name;
	private String discription;
	private String tag;
	//private int service_id;
	private float item_stax;
	private float item_ctax;
	private float item_price;
	private String thumbnail_url;

	/*
	 * @ManyToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "service_id", referencedColumnName = "service_id",
	 * insertable = false, updatable = false)
	 * 
	 * private Service ser1;
	 * 
	 */



		



}
