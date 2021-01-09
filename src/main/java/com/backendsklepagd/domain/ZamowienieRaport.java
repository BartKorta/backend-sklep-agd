package com.backendsklepagd.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ZamowienieRaport.
 */
@Entity
@Table(name = "zamowienie_raport")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ZamowienieRaport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "zamowienieRaports", allowSetters = true)
    private Raport raport;

    @ManyToOne
    @JsonIgnoreProperties(value = "zamowienieRaports", allowSetters = true)
    private Zamowienie zamowienie;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Raport getRaport() {
        return raport;
    }

    public ZamowienieRaport raport(Raport raport) {
        this.raport = raport;
        return this;
    }

    public void setRaport(Raport raport) {
        this.raport = raport;
    }

    public Zamowienie getZamowienie() {
        return zamowienie;
    }

    public ZamowienieRaport zamowienie(Zamowienie zamowienie) {
        this.zamowienie = zamowienie;
        return this;
    }

    public void setZamowienie(Zamowienie zamowienie) {
        this.zamowienie = zamowienie;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ZamowienieRaport)) {
            return false;
        }
        return id != null && id.equals(((ZamowienieRaport) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ZamowienieRaport{" +
            "id=" + getId() +
            "}";
    }
}
