package com.backendsklepagd.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ProduktKoszyk.
 */
@Entity
@Table(name = "produkt_koszyk")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProduktKoszyk implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ilosc")
    private Integer ilosc;

    @Column(name = "suma")
    private Double suma;

    @ManyToOne
    @JsonIgnoreProperties(value = "produktKoszyks", allowSetters = true)
    private Koszyk koszyk;

    @ManyToOne
    @JsonIgnoreProperties(value = "produktKoszyks", allowSetters = true)
    private Produkt produkt;

    @ManyToOne
    @JsonIgnoreProperties(value = "produktKoszyks", allowSetters = true)
    private Zamowienie zamowienie;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIlosc() {
        return ilosc;
    }

    public ProduktKoszyk ilosc(Integer ilosc) {
        this.ilosc = ilosc;
        return this;
    }

    public void setIlosc(Integer ilosc) {
        this.ilosc = ilosc;
    }

    public Double getSuma() {
        return suma;
    }

    public ProduktKoszyk suma(Double suma) {
        this.suma = suma;
        return this;
    }

    public void setSuma(Double suma) {
        this.suma = suma;
    }

    public Koszyk getKoszyk() {
        return koszyk;
    }

    public ProduktKoszyk koszyk(Koszyk koszyk) {
        this.koszyk = koszyk;
        return this;
    }

    public void setKoszyk(Koszyk koszyk) {
        this.koszyk = koszyk;
    }

    public Produkt getProdukt() {
        return produkt;
    }

    public ProduktKoszyk produkt(Produkt produkt) {
        this.produkt = produkt;
        return this;
    }

    public void setProdukt(Produkt produkt) {
        this.produkt = produkt;
    }

    public Zamowienie getZamowienie() {
        return zamowienie;
    }

    public ProduktKoszyk zamowienie(Zamowienie zamowienie) {
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
        if (!(o instanceof ProduktKoszyk)) {
            return false;
        }
        return id != null && id.equals(((ProduktKoszyk) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProduktKoszyk{" +
            "id=" + getId() +
            ", ilosc=" + getIlosc() +
            ", suma=" + getSuma() +
            "}";
    }
}
