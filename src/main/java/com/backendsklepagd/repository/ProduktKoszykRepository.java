package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Koszyk;
import com.backendsklepagd.domain.Produkt;
import com.backendsklepagd.domain.ProduktKoszyk;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProduktKoszyk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProduktKoszykRepository extends JpaRepository<ProduktKoszyk, Long> {
    @Query("SELECT produkt.cena FROM Produkt produkt WHERE produkt= :produkt")
    Double getCena(@Param("produkt") Produkt produkt);

    @Query("SELECT koszyk FROM Koszyk koszyk WHERE koszyk.user.login = ?#{principal.username}")
    Koszyk getKoszyk();
}
