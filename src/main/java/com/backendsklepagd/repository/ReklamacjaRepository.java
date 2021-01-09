package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Reklamacja;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Reklamacja entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReklamacjaRepository extends JpaRepository<Reklamacja, Long> {
}
