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
@Table(name = "service")

public class Service {
	public Service() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int service_id;
	private String name;
	private String discription;
	private int deparment_id;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "yyyy-MM-dd")
	@Column(name = "created_date", nullable = true, updatable = false)
	@CreatedDate
	private Date avilability_time;
	private String thambnail_url;

	
	/*
	 * @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	 * "ser1")
	 * 
	 * private Set<ServiceItem> seritem = new HashSet<>();
	 * 
	 * public Set<ServiceItem> getSeritem() { return seritem; }
	 * 
	 * public void setSeritem(Set<ServiceItem> seritem) { this.seritem = seritem; }
	 */

	/*
	 * @ManyToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable =
	 * false, updatable = false)
	 * 
	 * private User usss3;
	 */


}
