package com.backendsklepagd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Raport.
 */
@Entity
@Table(name = "raport")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Raport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "opis")
    private String opis;

    @Column(name = "data_utworzenia")
    private ZonedDateTime dataUtworzenia;

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

    public Raport opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public ZonedDateTime getDataUtworzenia() {
        return dataUtworzenia;
    }

    public Raport dataUtworzenia(ZonedDateTime dataUtworzenia) {
        this.dataUtworzenia = dataUtworzenia;
        return this;
    }

    public void setDataUtworzenia(ZonedDateTime dataUtworzenia) {
        this.dataUtworzenia = dataUtworzenia;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Raport)) {
            return false;
        }
        return id != null && id.equals(((Raport) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Raport{" +
            "id=" + getId() +
            ", opis='" + getOpis() + "'" +
            ", dataUtworzenia='" + getDataUtworzenia() + "'" +
            "}";
    }
}
