package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.Dostawa;
import com.backendsklepagd.domain.Zamowienie;
import com.backendsklepagd.repository.DostawaRepository;
import com.backendsklepagd.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.backendsklepagd.domain.Dostawa}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DostawaResource {

    private final Logger log = LoggerFactory.getLogger(DostawaResource.class);

    private static final String ENTITY_NAME = "dostawa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DostawaRepository dostawaRepository;

    public DostawaResource(DostawaRepository dostawaRepository) {
        this.dostawaRepository = dostawaRepository;
    }

    /**
     * {@code POST  /dostawas} : Create a new dostawa.
     *
     * @param dostawa the dostawa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dostawa, or with status {@code 400 (Bad Request)} if the dostawa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dostawas")
    public ResponseEntity<Dostawa> createDostawa(@Valid @RequestBody Dostawa dostawa) throws URISyntaxException {
        log.debug("REST request to save Dostawa : {}", dostawa);
        if (dostawa.getId() != null) {
            throw new BadRequestAlertException("A new dostawa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        List<Zamowienie> zamow = dostawaRepository.getLatestZamowienieByUser();
        if(zamow.size()>0) {
            dostawa.setZamowienie(zamow.get(0));
        }
        dostawa.setDataWysylki(ZonedDateTime.now());
        Dostawa result = dostawaRepository.save(dostawa);
        return ResponseEntity.created(new URI("/api/dostawas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }



    /**
     * {@code PUT  /dostawas} : Updates an existing dostawa.
     *
     * @param dostawa the dostawa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dostawa,
     * or with status {@code 400 (Bad Request)} if the dostawa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dostawa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dostawas")
    public ResponseEntity<Dostawa> updateDostawa(@Valid @RequestBody Dostawa dostawa) throws URISyntaxException {
        log.debug("REST request to update Dostawa : {}", dostawa);
        if (dostawa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dostawa result = dostawaRepository.save(dostawa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dostawa.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dostawas} : get all the dostawas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dostawas in body.
     */
    @GetMapping("/dostawas")
    public List<Dostawa> getAllDostawas() {
        log.debug("REST request to get all Dostawas");
        return dostawaRepository.findAll();
    }

    /**
     * {@code GET  /dostawas/:id} : get the "id" dostawa.
     *
     * @param id the id of the dostawa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dostawa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dostawas/{id}")
    public ResponseEntity<Dostawa> getDostawa(@PathVariable Long id) {
        log.debug("REST request to get Dostawa : {}", id);
        Optional<Dostawa> dostawa = dostawaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dostawa);
    }

    /**
     * {@code DELETE  /dostawas/:id} : delete the "id" dostawa.
     *
     * @param id the id of the dostawa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dostawas/{id}")
    public ResponseEntity<Void> deleteDostawa(@PathVariable Long id) {
        log.debug("REST request to delete Dostawa : {}", id);
        dostawaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
