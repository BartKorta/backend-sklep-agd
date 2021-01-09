package com.backendsklepagd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Reklamacja.
 */
@Entity
@Table(name = "reklamacja")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reklamacja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "opis")
    private String opis;

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

    public String getOpis() {
        return opis;
    }

    public Reklamacja opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Zamowienie getZamowienie() {
        return zamowienie;
    }

    public Reklamacja zamowienie(Zamowienie zamowienie) {
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
        if (!(o instanceof Reklamacja)) {
            return false;
        }
        return id != null && id.equals(((Reklamacja) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reklamacja{" +
            "id=" + getId() +
            ", opis='" + getOpis() + "'" +
            "}";
    }
}
