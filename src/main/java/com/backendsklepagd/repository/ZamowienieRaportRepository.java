package com.backendsklepagd.repository;

import com.backendsklepagd.domain.ZamowienieRaport;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ZamowienieRaport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZamowienieRaportRepository extends JpaRepository<ZamowienieRaport, Long> {
}
