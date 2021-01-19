package com.backendsklepagd.service.dto;

import com.backendsklepagd.domain.Reklamacja;

import javax.persistence.Column;

public class ReklamacjaDTO {
    private Long id;
    private String opis;
    private Long zamowienieId;
    public ReklamacjaDTO(){

    }
    public ReklamacjaDTO(Long id, String opis, Long zamowienieId) {
        this.id = id;
        this.opis = opis;
        this.zamowienieId = zamowienieId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Long getZamowienieId() {
        return zamowienieId;
    }

    public void setZamowienieId(Long zamowienieId) {
        this.zamowienieId = zamowienieId;
    }
}
