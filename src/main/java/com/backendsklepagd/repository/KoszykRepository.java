package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Koszyk;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Koszyk entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KoszykRepository extends JpaRepository<Koszyk, Long> {
}
