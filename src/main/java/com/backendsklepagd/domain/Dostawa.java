package com.backendsklepagd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Dostawa.
 */
@Entity
@Table(name = "dostawa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Dostawa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "adres", nullable = false)
    private String adres;

    @NotNull
    @Column(name = "numer_kontaktowy", nullable = false)
    private String numerKontaktowy;

    @Column(name = "data_wysylki")
    private ZonedDateTime dataWysylki;

    @Column(name = "dostawca")
    private String dostawca;

    @OneToOne
    @JoinColumn(unique = true)
    private Zamowienie zamowienie;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdres() {
        return adres;
    }

    public Dostawa adres(String adres) {
        this.adres = adres;
        return this;
    }

    public void setAdres(String adres) {
        this.adres = adres;
    }

    public String getNumerKontaktowy() {
        return numerKontaktowy;
    }

    public Dostawa numerKontaktowy(String numerKontaktowy) {
        this.numerKontaktowy = numerKontaktowy;
        return this;
    }

    public void setNumerKontaktowy(String numerKontaktowy) {
        this.numerKontaktowy = numerKontaktowy;
    }

    public ZonedDateTime getDataWysylki() {
        return dataWysylki;
    }

    public Dostawa dataWysylki(ZonedDateTime dataWysylki) {
        this.dataWysylki = dataWysylki;
        return this;
    }

    public void setDataWysylki(ZonedDateTime dataWysylki) {
        this.dataWysylki = dataWysylki;
    }

    public String getDostawca() {
        return dostawca;
    }

    public Dostawa dostawca(String dostawca) {
        this.dostawca = dostawca;
        return this;
    }

    public void setDostawca(String dostawca) {
        this.dostawca = dostawca;
    }

    public Zamowienie getZamowienie() {
        return zamowienie;
    }

    public Dostawa zamowienie(Zamowienie zamowienie) {
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
        if (!(o instanceof Dostawa)) {
            return false;
        }
        return id != null && id.equals(((Dostawa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dostawa{" +
            "id=" + getId() +
            ", adres='" + getAdres() + "'" +
            ", numerKontaktowy='" + getNumerKontaktowy() + "'" +
            ", dataWysylki='" + getDataWysylki() + "'" +
            ", dostawca='" + getDostawca() + "'" +
            "}";
    }
}
