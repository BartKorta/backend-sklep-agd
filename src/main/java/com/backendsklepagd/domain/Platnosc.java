package com.backendsklepagd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Platnosc.
 */
@Entity
@Table(name = "platnosc")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Platnosc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "elektroniczna")
    private Boolean elektroniczna;

    @Column(name = "posrednik")
    private String posrednik;

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

    public Boolean isElektroniczna() {
        return elektroniczna;
    }

    public Platnosc elektroniczna(Boolean elektroniczna) {
        this.elektroniczna = elektroniczna;
        return this;
    }

    public void setElektroniczna(Boolean elektroniczna) {
        this.elektroniczna = elektroniczna;
    }

    public String getPosrednik() {
        return posrednik;
    }

    public Platnosc posrednik(String posrednik) {
        this.posrednik = posrednik;
        return this;
    }

    public void setPosrednik(String posrednik) {
        this.posrednik = posrednik;
    }

    public Zamowienie getZamowienie() {
        return zamowienie;
    }

    public Platnosc zamowienie(Zamowienie zamowienie) {
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
        if (!(o instanceof Platnosc)) {
            return false;
        }
        return id != null && id.equals(((Platnosc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Platnosc{" +
            "id=" + getId() +
            ", elektroniczna='" + isElektroniczna() + "'" +
            ", posrednik='" + getPosrednik() + "'" +
            "}";
    }
}
