package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.*;
import com.backendsklepagd.repository.ProduktKoszykRepository;
import com.backendsklepagd.repository.ZamowienieRepository;
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
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.backendsklepagd.domain.Zamowienie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ZamowienieResource {

    private final Logger log = LoggerFactory.getLogger(ZamowienieResource.class);

    private static final String ENTITY_NAME = "zamowienie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ZamowienieRepository zamowienieRepository;
    private final ProduktKoszykRepository produktKoszykRepository;
    public ZamowienieResource(ZamowienieRepository zamowienieRepository, ProduktKoszykRepository produktKoszykRepository) {
        this.zamowienieRepository = zamowienieRepository;
        this.produktKoszykRepository = produktKoszykRepository;
    }

    /**
     * {@code POST  /zamowienies} : Create a new zamowienie.
     *
     * @param zamowienie the zamowienie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new zamowienie, or with status {@code 400 (Bad Request)} if the zamowienie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/zamowienies")
    public ResponseEntity<Zamowienie> createZamowienie(@RequestBody Zamowienie zamowienie) throws URISyntaxException {
        log.debug("REST request to save Zamowienie : {}", zamowienie);
        if (zamowienie.getId() != null) {
            throw new BadRequestAlertException("A new zamowienie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        zamowienie.setDataZamowienia(ZonedDateTime.now());
        User currUser = zamowienieRepository.getCurrentUser();
        Koszyk usersKoszyk = zamowienieRepository.getCurrentUserKoszyk();
        List<ProduktKoszyk> list = zamowienieRepository.getListOfNowInKoszyk(usersKoszyk);
        Double suma=0.0;
        for(int i=0; i<list.size(); i++)
            suma+=list.get(i).getSuma();
        zamowienie.setSuma(suma);
        zamowienie.setUser(currUser);
        Zamowienie result = zamowienieRepository.save(zamowienie);
        for(int i=0; i<list.size(); i++)
        {
            ProduktKoszyk prod = list.get(i);
            prod.setZamowienie(zamowienie);
            produktKoszykRepository.save(prod);
        }
        return ResponseEntity.created(new URI("/api/zamowienies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /zamowienies} : Updates an existing zamowienie.
     *
     * @param zamowienie the zamowienie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zamowienie,
     * or with status {@code 400 (Bad Request)} if the zamowienie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the zamowienie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/zamowienies")
    public ResponseEntity<Zamowienie> updateZamowienie(@RequestBody Zamowienie zamowienie) throws URISyntaxException {
        log.debug("REST request to update Zamowienie : {}", zamowienie);
        if (zamowienie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Zamowienie result = zamowienieRepository.save(zamowienie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, zamowienie.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /zamowienies} : get all the zamowienies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of zamowienies in body.
     */
    @GetMapping("/zamowienies")
    public List<Zamowienie> getAllZamowienies() {
        log.debug("REST request to get all Zamowienies");
        return zamowienieRepository.findAll();
    }

    /**
     * {@code GET  /zamowienies/:id} : get the "id" zamowienie.
     *
     * @param id the id of the zamowienie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the zamowienie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/zamowienies/{id}")
    public ResponseEntity<Zamowienie> getZamowienie(@PathVariable Long id) {
        log.debug("REST request to get Zamowienie : {}", id);
        Optional<Zamowienie> zamowienie = zamowienieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(zamowienie);
    }

    /**
     * {@code DELETE  /zamowienies/:id} : delete the "id" zamowienie.
     *
     * @param id the id of the zamowienie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/zamowienies/{id}")
    public ResponseEntity<Void> deleteZamowienie(@PathVariable Long id) {
        log.debug("REST request to delete Zamowienie : {}", id);
        zamowienieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
