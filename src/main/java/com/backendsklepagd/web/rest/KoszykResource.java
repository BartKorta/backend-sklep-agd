package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.Koszyk;
import com.backendsklepagd.repository.KoszykRepository;
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
 * REST controller for managing {@link com.backendsklepagd.domain.Koszyk}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KoszykResource {

    private final Logger log = LoggerFactory.getLogger(KoszykResource.class);

    private static final String ENTITY_NAME = "koszyk";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KoszykRepository koszykRepository;

    public KoszykResource(KoszykRepository koszykRepository) {
        this.koszykRepository = koszykRepository;
    }

    /**
     * {@code POST  /koszyks} : Create a new koszyk.
     *
     * @param koszyk the koszyk to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new koszyk, or with status {@code 400 (Bad Request)} if the koszyk has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/koszyks")
    public ResponseEntity<Koszyk> createKoszyk(@RequestBody Koszyk koszyk) throws URISyntaxException {
        log.debug("REST request to save Koszyk : {}", koszyk);
        if (koszyk.getId() != null) {
            throw new BadRequestAlertException("A new koszyk cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Koszyk result = koszykRepository.save(koszyk);
        return ResponseEntity.created(new URI("/api/koszyks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /koszyks} : Updates an existing koszyk.
     *
     * @param koszyk the koszyk to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated koszyk,
     * or with status {@code 400 (Bad Request)} if the koszyk is not valid,
     * or with status {@code 500 (Internal Server Error)} if the koszyk couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/koszyks")
    public ResponseEntity<Koszyk> updateKoszyk(@RequestBody Koszyk koszyk) throws URISyntaxException {
        log.debug("REST request to update Koszyk : {}", koszyk);
        if (koszyk.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Koszyk result = koszykRepository.save(koszyk);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, koszyk.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /koszyks} : get all the koszyks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of koszyks in body.
     */
    @GetMapping("/koszyks")
    public List<Koszyk> getAllKoszyks() {
        log.debug("REST request to get all Koszyks");
        return koszykRepository.findAll();
    }

    /**
     * {@code GET  /koszyks/:id} : get the "id" koszyk.
     *
     * @param id the id of the koszyk to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the koszyk, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/koszyks/{id}")
    public ResponseEntity<Koszyk> getKoszyk(@PathVariable Long id) {
        log.debug("REST request to get Koszyk : {}", id);
        Optional<Koszyk> koszyk = koszykRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(koszyk);
    }

    /**
     * {@code DELETE  /koszyks/:id} : delete the "id" koszyk.
     *
     * @param id the id of the koszyk to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/koszyks/{id}")
    public ResponseEntity<Void> deleteKoszyk(@PathVariable Long id) {
        log.debug("REST request to delete Koszyk : {}", id);
        koszykRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
