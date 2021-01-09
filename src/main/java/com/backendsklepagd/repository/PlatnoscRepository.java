package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Platnosc;

import com.backendsklepagd.domain.Zamowienie;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Platnosc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlatnoscRepository extends JpaRepository<Platnosc, Long> {

    @Query("SELECT zamowienie FROM Zamowienie zamowienie WHERE zamowienie.user.login = ?#{principal.username} ORDER BY zamowienie.dataZamowienia DESC")
    List<Zamowienie> getLatestZamowienieByUser();
}
