package com.backendsklepagd.service.dto;

public class PodsumowanieDTO {
    private Long id;
    private Double suma;
    private String adres;
    private String numerKontaktowy;
    private String dostawca;
    private String posrednik;

    public String getDostawca() {
        return dostawca;
    }

    public void setDostawca(String dostawca) {
        this.dostawca = dostawca;
    }

    public PodsumowanieDTO(Long id, Double suma, String adres, String numerKontaktowy, String dostawca, String posrednik) {
        this.id = id;
        this.suma = suma;
        this.adres = adres;
        this.numerKontaktowy = numerKontaktowy;
        this.dostawca = dostawca;
        this.posrednik = posrednik;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSuma() {
        return suma;
    }

    public void setSuma(Double suma) {
        this.suma = suma;
    }

    public String getAdres() {
        return adres;
    }

    public void setAdres(String adres) {
        this.adres = adres;
    }

    public String getNumerKontaktowy() {
        return numerKontaktowy;
    }

    public void setNumerKontaktowy(String numerKontaktowy) {
        this.numerKontaktowy = numerKontaktowy;
    }

    public String getPosrednik() {
        return posrednik;
    }

    public void setPosrednik(String posrednik) {
        this.posrednik = posrednik;
    }
}
