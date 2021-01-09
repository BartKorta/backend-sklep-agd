package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.Reklamacja;
import com.backendsklepagd.repository.ReklamacjaRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReklamacjaResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReklamacjaResourceIT {

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    @Autowired
    private ReklamacjaRepository reklamacjaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReklamacjaMockMvc;

    private Reklamacja reklamacja;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reklamacja createEntity(EntityManager em) {
        Reklamacja reklamacja = new Reklamacja()
            .opis(DEFAULT_OPIS);
        return reklamacja;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reklamacja createUpdatedEntity(EntityManager em) {
        Reklamacja reklamacja = new Reklamacja()
            .opis(UPDATED_OPIS);
        return reklamacja;
    }

    @BeforeEach
    public void initTest() {
        reklamacja = createEntity(em);
    }

    @Test
    @Transactional
    public void createReklamacja() throws Exception {
        int databaseSizeBeforeCreate = reklamacjaRepository.findAll().size();
        // Create the Reklamacja
        restReklamacjaMockMvc.perform(post("/api/reklamacjas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reklamacja)))
            .andExpect(status().isCreated());

        // Validate the Reklamacja in the database
        List<Reklamacja> reklamacjaList = reklamacjaRepository.findAll();
        assertThat(reklamacjaList).hasSize(databaseSizeBeforeCreate + 1);
        Reklamacja testReklamacja = reklamacjaList.get(reklamacjaList.size() - 1);
        assertThat(testReklamacja.getOpis()).isEqualTo(DEFAULT_OPIS);
    }

    @Test
    @Transactional
    public void createReklamacjaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reklamacjaRepository.findAll().size();

        // Create the Reklamacja with an existing ID
        reklamacja.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReklamacjaMockMvc.perform(post("/api/reklamacjas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reklamacja)))
            .andExpect(status().isBadRequest());

        // Validate the Reklamacja in the database
        List<Reklamacja> reklamacjaList = reklamacjaRepository.findAll();
        assertThat(reklamacjaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReklamacjas() throws Exception {
        // Initialize the database
        reklamacjaRepository.saveAndFlush(reklamacja);

        // Get all the reklamacjaList
        restReklamacjaMockMvc.perform(get("/api/reklamacjas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reklamacja.getId().intValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS)));
    }
    
    @Test
    @Transactional
    public void getReklamacja() throws Exception {
        // Initialize the database
        reklamacjaRepository.saveAndFlush(reklamacja);

        // Get the reklamacja
        restReklamacjaMockMvc.perform(get("/api/reklamacjas/{id}", reklamacja.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reklamacja.getId().intValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS));
    }
    @Test
    @Transactional
    public void getNonExistingReklamacja() throws Exception {
        // Get the reklamacja
        restReklamacjaMockMvc.perform(get("/api/reklamacjas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReklamacja() throws Exception {
        // Initialize the database
        reklamacjaRepository.saveAndFlush(reklamacja);

        int databaseSizeBeforeUpdate = reklamacjaRepository.findAll().size();

        // Update the reklamacja
        Reklamacja updatedReklamacja = reklamacjaRepository.findById(reklamacja.getId()).get();
        // Disconnect from session so that the updates on updatedReklamacja are not directly saved in db
        em.detach(updatedReklamacja);
        updatedReklamacja
            .opis(UPDATED_OPIS);

        restReklamacjaMockMvc.perform(put("/api/reklamacjas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReklamacja)))
            .andExpect(status().isOk());

        // Validate the Reklamacja in the database
        List<Reklamacja> reklamacjaList = reklamacjaRepository.findAll();
        assertThat(reklamacjaList).hasSize(databaseSizeBeforeUpdate);
        Reklamacja testReklamacja = reklamacjaList.get(reklamacjaList.size() - 1);
        assertThat(testReklamacja.getOpis()).isEqualTo(UPDATED_OPIS);
    }

    @Test
    @Transactional
    public void updateNonExistingReklamacja() throws Exception {
        int databaseSizeBeforeUpdate = reklamacjaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReklamacjaMockMvc.perform(put("/api/reklamacjas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reklamacja)))
            .andExpect(status().isBadRequest());

        // Validate the Reklamacja in the database
        List<Reklamacja> reklamacjaList = reklamacjaRepository.findAll();
        assertThat(reklamacjaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReklamacja() throws Exception {
        // Initialize the database
        reklamacjaRepository.saveAndFlush(reklamacja);

        int databaseSizeBeforeDelete = reklamacjaRepository.findAll().size();

        // Delete the reklamacja
        restReklamacjaMockMvc.perform(delete("/api/reklamacjas/{id}", reklamacja.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reklamacja> reklamacjaList = reklamacjaRepository.findAll();
        assertThat(reklamacjaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
