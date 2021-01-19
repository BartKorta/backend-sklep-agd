package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.Reklamacja;
import com.backendsklepagd.domain.Zamowienie;
import com.backendsklepagd.repository.ReklamacjaRepository;
import com.backendsklepagd.service.dto.ReklamacjaDTO;
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
 * REST controller for managing {@link com.backendsklepagd.domain.Reklamacja}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReklamacjaResource {

    private final Logger log = LoggerFactory.getLogger(ReklamacjaResource.class);

    private static final String ENTITY_NAME = "reklamacja";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReklamacjaRepository reklamacjaRepository;

    public ReklamacjaResource(ReklamacjaRepository reklamacjaRepository) {
        this.reklamacjaRepository = reklamacjaRepository;
    }

    /**
     * {@code POST  /reklamacjas} : Create a new reklamacja.
     *
     * @param reklamacja the reklamacja to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reklamacja, or with status {@code 400 (Bad Request)} if the reklamacja has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reklamacjas")
    public ResponseEntity<ReklamacjaDTO> createReklamacja(@RequestBody ReklamacjaDTO reklamacja) throws URISyntaxException {
        log.debug("REST request to save Reklamacja : {}", reklamacja);
        if (reklamacja.getId() != null) {
            throw new BadRequestAlertException("A new reklamacja cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if(reklamacjaRepository.getZamowienieForReklamacja(reklamacja.getZamowienieId())==null){
            return ResponseEntity.badRequest().body(reklamacja);
        }
        Zamowienie zamowienie = reklamacjaRepository.getZamowienieForReklamacja(reklamacja.getZamowienieId());
        Reklamacja result = new Reklamacja();
        result.setOpis(reklamacja.getOpis());
        result.setZamowienie(zamowienie);
        Reklamacja rx = reklamacjaRepository.save(result);
        return ResponseEntity.created(new URI("/api/reklamacjas/" + reklamacja.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(reklamacja);
    }

    /**
     * {@code PUT  /reklamacjas} : Updates an existing reklamacja.
     *
     * @param reklamacja the reklamacja to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reklamacja,
     * or with status {@code 400 (Bad Request)} if the reklamacja is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reklamacja couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reklamacjas")
    public ResponseEntity<Reklamacja> updateReklamacja(@RequestBody Reklamacja reklamacja) throws URISyntaxException {
        log.debug("REST request to update Reklamacja : {}", reklamacja);
        if (reklamacja.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Reklamacja result = reklamacjaRepository.save(reklamacja);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reklamacja.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reklamacjas} : get all the reklamacjas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reklamacjas in body.
     */
    @GetMapping("/reklamacjas")
    public List<Reklamacja> getAllReklamacjas() {
        log.debug("REST request to get all Reklamacjas");
        return reklamacjaRepository.findAll();
    }

    /**
     * {@code GET  /reklamacjas/:id} : get the "id" reklamacja.
     *
     * @param id the id of the reklamacja to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reklamacja, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reklamacjas/{id}")
    public ResponseEntity<Reklamacja> getReklamacja(@PathVariable Long id) {
        log.debug("REST request to get Reklamacja : {}", id);
        Optional<Reklamacja> reklamacja = reklamacjaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reklamacja);
    }

    /**
     * {@code DELETE  /reklamacjas/:id} : delete the "id" reklamacja.
     *
     * @param id the id of the reklamacja to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reklamacjas/{id}")
    public ResponseEntity<Void> deleteReklamacja(@PathVariable Long id) {
        log.debug("REST request to delete Reklamacja : {}", id);
        reklamacjaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
