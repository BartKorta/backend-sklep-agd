package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Reklamacja;

import com.backendsklepagd.domain.Zamowienie;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Reklamacja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReklamacjaRepository extends JpaRepository<Reklamacja, Long> {
    @Query("SELECT zamowienie FROM Zamowienie zamowienie WHERE zamowienie.id= :zamowienieId")
    Zamowienie getZamowienieForReklamacja(@Param("zamowienieId") Long zamowienieId);
}
