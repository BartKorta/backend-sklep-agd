package com.backendsklepagd.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Zamowienie.
 */
@Entity
@Table(name = "zamowienie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Zamowienie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "suma")
    private Double suma;

    @Column(name = "data_zamowienia")
    private ZonedDateTime dataZamowienia;

    @ManyToOne
    @JsonIgnoreProperties(value = "zamowienies", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSuma() {
        return suma;
    }

    public Zamowienie suma(Double suma) {
        this.suma = suma;
        return this;
    }

    public void setSuma(Double suma) {
        this.suma = suma;
    }

    public ZonedDateTime getDataZamowienia() {
        return dataZamowienia;
    }

    public Zamowienie dataZamowienia(ZonedDateTime dataZamowienia) {
        this.dataZamowienia = dataZamowienia;
        return this;
    }

    public void setDataZamowienia(ZonedDateTime dataZamowienia) {
        this.dataZamowienia = dataZamowienia;
    }

    public User getUser() {
        return user;
    }

    public Zamowienie user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Zamowienie)) {
            return false;
        }
        return id != null && id.equals(((Zamowienie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Zamowienie{" +
            "id=" + getId() +
            ", suma=" + getSuma() +
            ", dataZamowienia='" + getDataZamowienia() + "'" +
            "}";
    }
}
