package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Produkt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Spring Data  repository for the Produkt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProduktRepository extends JpaRepository<Produkt, Long> {

    @Query("SELECT produktkoszyk.produkt FROM ProduktKoszyk produktkoszyk WHERE produktkoszyk.zamowienie=null  AND produktkoszyk.koszyk.user.login= ?#{principal.username} ORDER BY produktkoszyk.id")
    List<Produkt> getProduktsinKoszyk();

    @Query("SELECT produktkoszyk.ilosc FROM ProduktKoszyk produktkoszyk WHERE produktkoszyk.zamowienie=null  AND produktkoszyk.koszyk.user.login= ?#{principal.username} ORDER BY produktkoszyk.id")
    List<Integer> getProduktsinKoszykIlosc();
}
