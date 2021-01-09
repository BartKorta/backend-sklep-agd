package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Koszyk;
import com.backendsklepagd.domain.ProduktKoszyk;
import com.backendsklepagd.domain.User;
import com.backendsklepagd.domain.Zamowienie;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Zamowienie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZamowienieRepository extends JpaRepository<Zamowienie, Long> {

    @Query("select zamowienie from Zamowienie zamowienie where zamowienie.user.login = ?#{principal.username}")
    List<Zamowienie> findByUserIsCurrentUser();

    @Query("SELECT user from User user WHERE user.login = ?#{principal.username}")
    User getCurrentUser();

    @Query("SELECT koszyk FROM Koszyk koszyk WHERE koszyk.user.login= ?#{principal.username}")
    Koszyk getCurrentUserKoszyk();

    @Query("SELECT produktkoszyk FROM ProduktKoszyk produktkoszyk WHERE produktkoszyk.koszyk= :koszyk AND produktkoszyk.zamowienie=null")
    List<ProduktKoszyk> getListOfNowInKoszyk(@Param("koszyk") Koszyk koszyk);
}
