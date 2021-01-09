package com.backendsklepagd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Produkt.
 */
@Entity
@Table(name = "produkt")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Produkt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nazwa", nullable = false)
    private String nazwa;

    @NotNull
    @Column(name = "cena", nullable = false)
    private Double cena;

    @Column(name = "opis")
    private String opis;

    @Column(name = "moc")
    private String moc;

    @Column(name = "dostepnosc")
    private String dostepnosc;

    @Column(name = "pojemnosc")
    private String pojemnosc;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public Produkt nazwa(String nazwa) {
        this.nazwa = nazwa;
        return this;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public Double getCena() {
        return cena;
    }

    public Produkt cena(Double cena) {
        this.cena = cena;
        return this;
    }

    public void setCena(Double cena) {
        this.cena = cena;
    }

    public String getOpis() {
        return opis;
    }

    public Produkt opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getMoc() {
        return moc;
    }

    public Produkt moc(String moc) {
        this.moc = moc;
        return this;
    }

    public void setMoc(String moc) {
        this.moc = moc;
    }

    public String getDostepnosc() {
        return dostepnosc;
    }

    public Produkt dostepnosc(String dostepnosc) {
        this.dostepnosc = dostepnosc;
        return this;
    }

    public void setDostepnosc(String dostepnosc) {
        this.dostepnosc = dostepnosc;
    }

    public String getPojemnosc() {
        return pojemnosc;
    }

    public Produkt pojemnosc(String pojemnosc) {
        this.pojemnosc = pojemnosc;
        return this;
    }

    public void setPojemnosc(String pojemnosc) {
        this.pojemnosc = pojemnosc;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produkt)) {
            return false;
        }
        return id != null && id.equals(((Produkt) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produkt{" +
            "id=" + getId() +
            ", nazwa='" + getNazwa() + "'" +
            ", cena=" + getCena() +
            ", opis='" + getOpis() + "'" +
            ", moc='" + getMoc() + "'" +
            ", dostepnosc='" + getDostepnosc() + "'" +
            ", pojemnosc='" + getPojemnosc() + "'" +
            "}";
    }
}
