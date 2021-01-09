package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.Raport;
import com.backendsklepagd.repository.RaportRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.backendsklepagd.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RaportResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RaportResourceIT {

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATA_UTWORZENIA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA_UTWORZENIA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private RaportRepository raportRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRaportMockMvc;

    private Raport raport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Raport createEntity(EntityManager em) {
        Raport raport = new Raport()
            .opis(DEFAULT_OPIS)
            .dataUtworzenia(DEFAULT_DATA_UTWORZENIA);
        return raport;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Raport createUpdatedEntity(EntityManager em) {
        Raport raport = new Raport()
            .opis(UPDATED_OPIS)
            .dataUtworzenia(UPDATED_DATA_UTWORZENIA);
        return raport;
    }

    @BeforeEach
    public void initTest() {
        raport = createEntity(em);
    }

    @Test
    @Transactional
    public void createRaport() throws Exception {
        int databaseSizeBeforeCreate = raportRepository.findAll().size();
        // Create the Raport
        restRaportMockMvc.perform(post("/api/raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(raport)))
            .andExpect(status().isCreated());

        // Validate the Raport in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeCreate + 1);
        Raport testRaport = raportList.get(raportList.size() - 1);
        assertThat(testRaport.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testRaport.getDataUtworzenia()).isEqualTo(DEFAULT_DATA_UTWORZENIA);
    }

    @Test
    @Transactional
    public void createRaportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = raportRepository.findAll().size();

        // Create the Raport with an existing ID
        raport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRaportMockMvc.perform(post("/api/raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(raport)))
            .andExpect(status().isBadRequest());

        // Validate the Raport in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRaports() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);

        // Get all the raportList
        restRaportMockMvc.perform(get("/api/raports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(raport.getId().intValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS)))
            .andExpect(jsonPath("$.[*].dataUtworzenia").value(hasItem(sameInstant(DEFAULT_DATA_UTWORZENIA))));
    }
    
    @Test
    @Transactional
    public void getRaport() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);

        // Get the raport
        restRaportMockMvc.perform(get("/api/raports/{id}", raport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(raport.getId().intValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS))
            .andExpect(jsonPath("$.dataUtworzenia").value(sameInstant(DEFAULT_DATA_UTWORZENIA)));
    }
    @Test
    @Transactional
    public void getNonExistingRaport() throws Exception {
        // Get the raport
        restRaportMockMvc.perform(get("/api/raports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRaport() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);

        int databaseSizeBeforeUpdate = raportRepository.findAll().size();

        // Update the raport
        Raport updatedRaport = raportRepository.findById(raport.getId()).get();
        // Disconnect from session so that the updates on updatedRaport are not directly saved in db
        em.detach(updatedRaport);
        updatedRaport
            .opis(UPDATED_OPIS)
            .dataUtworzenia(UPDATED_DATA_UTWORZENIA);

        restRaportMockMvc.perform(put("/api/raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRaport)))
            .andExpect(status().isOk());

        // Validate the Raport in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeUpdate);
        Raport testRaport = raportList.get(raportList.size() - 1);
        assertThat(testRaport.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testRaport.getDataUtworzenia()).isEqualTo(UPDATED_DATA_UTWORZENIA);
    }

    @Test
    @Transactional
    public void updateNonExistingRaport() throws Exception {
        int databaseSizeBeforeUpdate = raportRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRaportMockMvc.perform(put("/api/raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(raport)))
            .andExpect(status().isBadRequest());

        // Validate the Raport in the database
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRaport() throws Exception {
        // Initialize the database
        raportRepository.saveAndFlush(raport);

        int databaseSizeBeforeDelete = raportRepository.findAll().size();

        // Delete the raport
        restRaportMockMvc.perform(delete("/api/raports/{id}", raport.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Raport> raportList = raportRepository.findAll();
        assertThat(raportList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
