package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.Koszyk;
import com.backendsklepagd.domain.Produkt;
import com.backendsklepagd.domain.ProduktKoszyk;
import com.backendsklepagd.repository.ProduktKoszykRepository;
import com.backendsklepagd.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.checkerframework.checker.nullness.Opt;
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
 * REST controller for managing {@link com.backendsklepagd.domain.ProduktKoszyk}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProduktKoszykResource {

    private final Logger log = LoggerFactory.getLogger(ProduktKoszykResource.class);

    private static final String ENTITY_NAME = "produktKoszyk";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProduktKoszykRepository produktKoszykRepository;

    public ProduktKoszykResource(ProduktKoszykRepository produktKoszykRepository) {
        this.produktKoszykRepository = produktKoszykRepository;
    }

    /**
     * {@code POST  /produkt-koszyks} : Create a new produktKoszyk.
     *
     * @param produktKoszyk the produktKoszyk to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produktKoszyk, or with status {@code 400 (Bad Request)} if the produktKoszyk has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/produkt-koszyks")
    public ResponseEntity<ProduktKoszyk> createProduktKoszyk(@RequestBody ProduktKoszyk produktKoszyk) throws URISyntaxException {
        log.debug("REST request to save ProduktKoszyk : {}", produktKoszyk);
        if (produktKoszyk.getId() != null) {
            throw new BadRequestAlertException("A new produktKoszyk cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Double suma=produktKoszykRepository.getCena(produktKoszyk.getProdukt());
        suma=suma*produktKoszyk.getIlosc();
        produktKoszyk.setSuma(suma);
        Koszyk newkoszyk = produktKoszykRepository.getKoszyk();
        produktKoszyk.setKoszyk(newkoszyk);
        ProduktKoszyk result = produktKoszykRepository.save(produktKoszyk);
        return ResponseEntity.created(new URI("/api/produkt-koszyks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("produkt-koszyks/addbyid/{produktid}/{ile}")
    public ResponseEntity<ProduktKoszyk> createProduktKoszykByProdId(@PathVariable("produktid") long produktId,@PathVariable("ile") int ile) throws URISyntaxException {
            ProduktKoszyk pk = new ProduktKoszyk();
            pk.setProdukt(produktKoszykRepository.getProduktById(produktId));
            Double suma=produktKoszykRepository.getCena(pk.getProdukt())*ile;
            pk.setSuma(suma);
            Koszyk newkoszyk = produktKoszykRepository.getKoszyk();
            pk.setKoszyk(newkoszyk);
            pk.setZamowienie(null);
            pk.setIlosc(ile);
            ProduktKoszyk result = produktKoszykRepository.save(pk);
            return ResponseEntity.created(new URI("produkt-koszyks/"+ result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }
    /**
     * {@code PUT  /produkt-koszyks} : Updates an existing produktKoszyk.
     *
     * @param produktKoszyk the produktKoszyk to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produktKoszyk,
     * or with status {@code 400 (Bad Request)} if the produktKoszyk is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produktKoszyk couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/produkt-koszyks")
    public ResponseEntity<ProduktKoszyk> updateProduktKoszyk(@RequestBody ProduktKoszyk produktKoszyk) throws URISyntaxException {
        log.debug("REST request to update ProduktKoszyk : {}", produktKoszyk);
        if (produktKoszyk.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProduktKoszyk result = produktKoszykRepository.save(produktKoszyk);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, produktKoszyk.getId().toString()))
            .body(result);
    }

    @PutMapping("/produkt-koszyks/id/{id}/{ile}")
    public ResponseEntity<ProduktKoszyk> updateProduktKoszykbyId(@PathVariable("id") Long id, @PathVariable("ile") int ile) throws URISyntaxException {
        Optional<ProduktKoszyk> pk = produktKoszykRepository.findById(id);
        if(!pk.isPresent()){
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        else {
            ProduktKoszyk prodKosz=pk.get();
            prodKosz.setIlosc(ile);
            prodKosz.setSuma(prodKosz.getProdukt().getCena()*ile);
            ProduktKoszyk result = produktKoszykRepository.save(prodKosz);

            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, prodKosz.getId().toString()))
                .body(result);
        }

    }

    /**
     * {@code GET  /produkt-koszyks} : get all the produktKoszyks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produktKoszyks in body.
     */
    @GetMapping("/produkt-koszyks")
    public List<ProduktKoszyk> getAllProduktKoszyks() {
        log.debug("REST request to get all ProduktKoszyks");
        return produktKoszykRepository.findAll();
    }

    /**
     * {@code GET  /produkt-koszyks/:id} : get the "id" produktKoszyk.
     *
     * @param id the id of the produktKoszyk to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produktKoszyk, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/produkt-koszyks/{id}")
    public ResponseEntity<ProduktKoszyk> getProduktKoszyk(@PathVariable Long id) {
        log.debug("REST request to get ProduktKoszyk : {}", id);
        Optional<ProduktKoszyk> produktKoszyk = produktKoszykRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produktKoszyk);
    }

    /**
     * {@code DELETE  /produkt-koszyks/:id} : delete the "id" produktKoszyk.
     *
     * @param id the id of the produktKoszyk to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/produkt-koszyks/{id}")
    public ResponseEntity<Void> deleteProduktKoszyk(@PathVariable Long id) {
        log.debug("REST request to delete ProduktKoszyk : {}", id);
        produktKoszykRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
