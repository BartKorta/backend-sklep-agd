package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Dostawa;

import com.backendsklepagd.domain.User;
import com.backendsklepagd.domain.Zamowienie;
import org.checkerframework.framework.qual.DefaultQualifierInHierarchy;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Dostawa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DostawaRepository extends JpaRepository<Dostawa, Long> {
    @Query("SELECT zamowienie FROM Zamowienie zamowienie WHERE zamowienie.user.login = ?#{principal.username} ORDER BY zamowienie.dataZamowienia DESC")
    List<Zamowienie> getLatestZamowienieByUser();
}
