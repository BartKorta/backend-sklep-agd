package com.backendsklepagd.repository;

import com.backendsklepagd.domain.Raport;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Raport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RaportRepository extends JpaRepository<Raport, Long> {


}
