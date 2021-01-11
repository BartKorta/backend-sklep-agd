package com.backendsklepagd.web.rest;

import com.backendsklepagd.domain.Produkt;
import com.backendsklepagd.repository.ProduktRepository;
import com.backendsklepagd.service.dto.ProduktInKoszykDTO;
import com.backendsklepagd.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing {@link com.backendsklepagd.domain.Produkt}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProduktResource {

    private final Logger log = LoggerFactory.getLogger(ProduktResource.class);

    private static final String ENTITY_NAME = "produkt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProduktRepository produktRepository;

    public ProduktResource(ProduktRepository produktRepository) {
        this.produktRepository = produktRepository;
    }

    /**
     * {@code POST  /produkts} : Create a new produkt.
     *
     * @param produkt the produkt to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produkt, or with status {@code 400 (Bad Request)} if the produkt has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/produkts")
    public ResponseEntity<Produkt> createProdukt(@Valid @RequestBody Produkt produkt) throws URISyntaxException {
        log.debug("REST request to save Produkt : {}", produkt);
        if (produkt.getId() != null) {
            throw new BadRequestAlertException("A new produkt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Produkt result = produktRepository.save(produkt);
        return ResponseEntity.created(new URI("/api/produkts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /produkts} : Updates an existing produkt.
     *
     * @param produkt the produkt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produkt,
     * or with status {@code 400 (Bad Request)} if the produkt is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produkt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/produkts")
    public ResponseEntity<Produkt> updateProdukt(@Valid @RequestBody Produkt produkt) throws URISyntaxException {
        log.debug("REST request to update Produkt : {}", produkt);
        if (produkt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Produkt result = produktRepository.save(produkt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, produkt.getId().toString()))
            .body(result);
    }
    /**
     * {@code GET  /produkts} : get all the produkts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produkts in body.
     */
    @GetMapping("/produkts")
    public List<Produkt> getAllProdukts() {
        log.debug("REST request to get all Produkts");
        return produktRepository.findAll();
    }
    @GetMapping("/produkts/category/{catText}")
    public List<Produkt> getProduktsByCategory(@PathVariable("catText") String catText){
        return produktRepository.getProduktsByCategory(catText);
    }
    @GetMapping("/produkts/inkoszyk")
    public List<ProduktInKoszykDTO> getProduktsinKoszyk(){
        List<ProduktInKoszykDTO> listOfprod = new ArrayList<ProduktInKoszykDTO>();
        List<Produkt> op=produktRepository.getProduktsinKoszyk();
        List<Integer> oi = produktRepository.getProduktsinKoszykIlosc();
        for(int i=0; i<op.size(); i++)
        {
            listOfprod.add(new ProduktInKoszykDTO(op.get(i).getId(),op.get(i).getNazwa(),op.get(i).getCena(),op.get(i).getOpis(),op.get(i).getMoc(),op.get(i).getDostepnosc(),op.get(i).getPojemnosc(),oi.get(i)));
        }
        return listOfprod;
    }

    /**
     * {@code GET  /produkts/:id} : get the "id" produkt.
     *
     * @param id the id of the produkt to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produkt, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/produkts/{id}")
    public ResponseEntity<Produkt> getProdukt(@PathVariable Long id) {
        log.debug("REST request to get Produkt : {}", id);
        Optional<Produkt> produkt = produktRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produkt);
    }

    /**
     * {@code DELETE  /produkts/:id} : delete the "id" produkt.
     *
     * @param id the id of the produkt to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/produkts/{id}")
    public ResponseEntity<Void> deleteProdukt(@PathVariable Long id) {
        log.debug("REST request to delete Produkt : {}", id);
        produktRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
