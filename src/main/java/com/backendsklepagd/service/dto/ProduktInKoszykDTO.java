package com.backendsklepagd.service.dto;

import com.backendsklepagd.domain.Produkt;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

public class ProduktInKoszykDTO {

    private Long id;
    private String nazwa;
    private Double cena;
    private String opis;
    private String moc;
    private String dostepnosc;
    private String pojemnosc;
    private Integer ilosc;

    public ProduktInKoszykDTO(Long id, String nazwa, Double cena, String opis, String moc, String dostepnosc, String pojemnosc, Integer ilosc) {
        this.id = id;
        this.nazwa = nazwa;
        this.cena = cena;
        this.opis = opis;
        this.moc = moc;
        this.dostepnosc = dostepnosc;
        this.pojemnosc = pojemnosc;
        this.ilosc = ilosc;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public Double getCena() {
        return cena;
    }

    public void setCena(Double cena) {
        this.cena = cena;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getMoc() {
        return moc;
    }

    public void setMoc(String moc) {
        this.moc = moc;
    }

    public String getDostepnosc() {
        return dostepnosc;
    }

    public void setDostepnosc(String dostepnosc) {
        this.dostepnosc = dostepnosc;
    }

    public String getPojemnosc() {
        return pojemnosc;
    }

    public void setPojemnosc(String pojemnosc) {
        this.pojemnosc = pojemnosc;
    }

    public Integer getIlosc() {
        return ilosc;
    }

    public void setIlosc(Integer ilosc) {
        this.ilosc = ilosc;
    }
}
