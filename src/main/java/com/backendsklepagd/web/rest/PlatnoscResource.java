package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.Platnosc;
import com.backendsklepagd.domain.Zamowienie;
import com.backendsklepagd.repository.PlatnoscRepository;
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
 * REST controller for managing {@link com.backendsklepagd.domain.Platnosc}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlatnoscResource {

    private final Logger log = LoggerFactory.getLogger(PlatnoscResource.class);

    private static final String ENTITY_NAME = "platnosc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlatnoscRepository platnoscRepository;

    public PlatnoscResource(PlatnoscRepository platnoscRepository) {
        this.platnoscRepository = platnoscRepository;
    }

    /**
     * {@code POST  /platnoscs} : Create a new platnosc.
     *
     * @param platnosc the platnosc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new platnosc, or with status {@code 400 (Bad Request)} if the platnosc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/platnoscs/{czyelektr}/{posrednik}")
    public ResponseEntity<Platnosc> createWithPosrednik(@PathVariable("czyelektr") Boolean czyelektr, @PathVariable("posrednik") String posrednik) throws URISyntaxException {
        Platnosc platnosc = new Platnosc();
        platnosc.setZamowienie(platnoscRepository.getLatestZamowienieByUser().get(0));
        platnosc.setElektroniczna(czyelektr);
        if(czyelektr) platnosc.setPosrednik(posrednik);
        else platnosc.setPosrednik("");
        Platnosc result = platnoscRepository.save(platnosc);
        return ResponseEntity.created(new URI("/api/platnoscs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    @PostMapping("/platnoscs")
    public ResponseEntity<Platnosc> createPlatnosc(@RequestBody Platnosc platnosc) throws URISyntaxException {
        log.debug("REST request to save Platnosc : {}", platnosc);
        if (platnosc.getId() != null) {
            throw new BadRequestAlertException("A new platnosc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        List<Zamowienie> zamow = platnoscRepository.getLatestZamowienieByUser();
        if(zamow.size()>0) {
            platnosc.setZamowienie(zamow.get(0));
        }
        Platnosc result = platnoscRepository.save(platnosc);
        return ResponseEntity.created(new URI("/api/platnoscs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /platnoscs} : Updates an existing platnosc.
     *
     * @param platnosc the platnosc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated platnosc,
     * or with status {@code 400 (Bad Request)} if the platnosc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the platnosc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/platnoscs")
    public ResponseEntity<Platnosc> updatePlatnosc(@RequestBody Platnosc platnosc) throws URISyntaxException {
        log.debug("REST request to update Platnosc : {}", platnosc);
        if (platnosc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Platnosc result = platnoscRepository.save(platnosc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, platnosc.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /platnoscs} : get all the platnoscs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of platnoscs in body.
     */
    @GetMapping("/platnoscs")
    public List<Platnosc> getAllPlatnoscs() {
        log.debug("REST request to get all Platnoscs");
        return platnoscRepository.findAll();
    }

    /**
     * {@code GET  /platnoscs/:id} : get the "id" platnosc.
     *
     * @param id the id of the platnosc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the platnosc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/platnoscs/{id}")
    public ResponseEntity<Platnosc> getPlatnosc(@PathVariable Long id) {
        log.debug("REST request to get Platnosc : {}", id);
        Optional<Platnosc> platnosc = platnoscRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(platnosc);
    }

    /**
     * {@code DELETE  /platnoscs/:id} : delete the "id" platnosc.
     *
     * @param id the id of the platnosc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/platnoscs/{id}")
    public ResponseEntity<Void> deletePlatnosc(@PathVariable Long id) {
        log.debug("REST request to delete Platnosc : {}", id);
        platnoscRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
