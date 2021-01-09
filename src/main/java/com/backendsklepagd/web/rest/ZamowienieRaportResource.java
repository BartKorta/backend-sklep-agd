package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.ZamowienieRaport;
import com.backendsklepagd.repository.ZamowienieRaportRepository;
import com.backendsklepagd.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.backendsklepagd.domain.ZamowienieRaport}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ZamowienieRaportResource {

    private final Logger log = LoggerFactory.getLogger(ZamowienieRaportResource.class);

    private static final String ENTITY_NAME = "zamowienieRaport";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ZamowienieRaportRepository zamowienieRaportRepository;

    public ZamowienieRaportResource(ZamowienieRaportRepository zamowienieRaportRepository) {
        this.zamowienieRaportRepository = zamowienieRaportRepository;
    }

    /**
     * {@code POST  /zamowienie-raports} : Create a new zamowienieRaport.
     *
     * @param zamowienieRaport the zamowienieRaport to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new zamowienieRaport, or with status {@code 400 (Bad Request)} if the zamowienieRaport has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/zamowienie-raports")
    public ResponseEntity<ZamowienieRaport> createZamowienieRaport(@RequestBody ZamowienieRaport zamowienieRaport) throws URISyntaxException {
        log.debug("REST request to save ZamowienieRaport : {}", zamowienieRaport);
        if (zamowienieRaport.getId() != null) {
            throw new BadRequestAlertException("A new zamowienieRaport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZamowienieRaport result = zamowienieRaportRepository.save(zamowienieRaport);
        return ResponseEntity.created(new URI("/api/zamowienie-raports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /zamowienie-raports} : Updates an existing zamowienieRaport.
     *
     * @param zamowienieRaport the zamowienieRaport to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zamowienieRaport,
     * or with status {@code 400 (Bad Request)} if the zamowienieRaport is not valid,
     * or with status {@code 500 (Internal Server Error)} if the zamowienieRaport couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/zamowienie-raports")
    public ResponseEntity<ZamowienieRaport> updateZamowienieRaport(@RequestBody ZamowienieRaport zamowienieRaport) throws URISyntaxException {
        log.debug("REST request to update ZamowienieRaport : {}", zamowienieRaport);
        if (zamowienieRaport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ZamowienieRaport result = zamowienieRaportRepository.save(zamowienieRaport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, zamowienieRaport.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /zamowienie-raports} : get all the zamowienieRaports.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of zamowienieRaports in body.
     */
    @GetMapping("/zamowienie-raports")
    public List<ZamowienieRaport> getAllZamowienieRaports() {
        log.debug("REST request to get all ZamowienieRaports");
        return zamowienieRaportRepository.findAll();
    }

    /**
     * {@code GET  /zamowienie-raports/:id} : get the "id" zamowienieRaport.
     *
     * @param id the id of the zamowienieRaport to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the zamowienieRaport, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/zamowienie-raports/{id}")
    public ResponseEntity<ZamowienieRaport> getZamowienieRaport(@PathVariable Long id) {
        log.debug("REST request to get ZamowienieRaport : {}", id);
        Optional<ZamowienieRaport> zamowienieRaport = zamowienieRaportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(zamowienieRaport);
    }

    /**
     * {@code DELETE  /zamowienie-raports/:id} : delete the "id" zamowienieRaport.
     *
     * @param id the id of the zamowienieRaport to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/zamowienie-raports/{id}")
    public ResponseEntity<Void> deleteZamowienieRaport(@PathVariable Long id) {
        log.debug("REST request to delete ZamowienieRaport : {}", id);
        zamowienieRaportRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
