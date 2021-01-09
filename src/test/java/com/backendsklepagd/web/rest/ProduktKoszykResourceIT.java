package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.ProduktKoszyk;
import com.backendsklepagd.repository.ProduktKoszykRepository;

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
 * Integration tests for the {@link ProduktKoszykResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProduktKoszykResourceIT {

    private static final Integer DEFAULT_ILOSC = 1;
    private static final Integer UPDATED_ILOSC = 2;

    private static final Double DEFAULT_SUMA = 1D;
    private static final Double UPDATED_SUMA = 2D;

    @Autowired
    private ProduktKoszykRepository produktKoszykRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProduktKoszykMockMvc;

    private ProduktKoszyk produktKoszyk;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProduktKoszyk createEntity(EntityManager em) {
        ProduktKoszyk produktKoszyk = new ProduktKoszyk()
            .ilosc(DEFAULT_ILOSC)
            .suma(DEFAULT_SUMA);
        return produktKoszyk;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProduktKoszyk createUpdatedEntity(EntityManager em) {
        ProduktKoszyk produktKoszyk = new ProduktKoszyk()
            .ilosc(UPDATED_ILOSC)
            .suma(UPDATED_SUMA);
        return produktKoszyk;
    }

    @BeforeEach
    public void initTest() {
        produktKoszyk = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduktKoszyk() throws Exception {
        int databaseSizeBeforeCreate = produktKoszykRepository.findAll().size();
        // Create the ProduktKoszyk
        restProduktKoszykMockMvc.perform(post("/api/produkt-koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produktKoszyk)))
            .andExpect(status().isCreated());

        // Validate the ProduktKoszyk in the database
        List<ProduktKoszyk> produktKoszykList = produktKoszykRepository.findAll();
        assertThat(produktKoszykList).hasSize(databaseSizeBeforeCreate + 1);
        ProduktKoszyk testProduktKoszyk = produktKoszykList.get(produktKoszykList.size() - 1);
        assertThat(testProduktKoszyk.getIlosc()).isEqualTo(DEFAULT_ILOSC);
        assertThat(testProduktKoszyk.getSuma()).isEqualTo(DEFAULT_SUMA);
    }

    @Test
    @Transactional
    public void createProduktKoszykWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produktKoszykRepository.findAll().size();

        // Create the ProduktKoszyk with an existing ID
        produktKoszyk.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProduktKoszykMockMvc.perform(post("/api/produkt-koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produktKoszyk)))
            .andExpect(status().isBadRequest());

        // Validate the ProduktKoszyk in the database
        List<ProduktKoszyk> produktKoszykList = produktKoszykRepository.findAll();
        assertThat(produktKoszykList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProduktKoszyks() throws Exception {
        // Initialize the database
        produktKoszykRepository.saveAndFlush(produktKoszyk);

        // Get all the produktKoszykList
        restProduktKoszykMockMvc.perform(get("/api/produkt-koszyks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produktKoszyk.getId().intValue())))
            .andExpect(jsonPath("$.[*].ilosc").value(hasItem(DEFAULT_ILOSC)))
            .andExpect(jsonPath("$.[*].suma").value(hasItem(DEFAULT_SUMA.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getProduktKoszyk() throws Exception {
        // Initialize the database
        produktKoszykRepository.saveAndFlush(produktKoszyk);

        // Get the produktKoszyk
        restProduktKoszykMockMvc.perform(get("/api/produkt-koszyks/{id}", produktKoszyk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(produktKoszyk.getId().intValue()))
            .andExpect(jsonPath("$.ilosc").value(DEFAULT_ILOSC))
            .andExpect(jsonPath("$.suma").value(DEFAULT_SUMA.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProduktKoszyk() throws Exception {
        // Get the produktKoszyk
        restProduktKoszykMockMvc.perform(get("/api/produkt-koszyks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduktKoszyk() throws Exception {
        // Initialize the database
        produktKoszykRepository.saveAndFlush(produktKoszyk);

        int databaseSizeBeforeUpdate = produktKoszykRepository.findAll().size();

        // Update the produktKoszyk
        ProduktKoszyk updatedProduktKoszyk = produktKoszykRepository.findById(produktKoszyk.getId()).get();
        // Disconnect from session so that the updates on updatedProduktKoszyk are not directly saved in db
        em.detach(updatedProduktKoszyk);
        updatedProduktKoszyk
            .ilosc(UPDATED_ILOSC)
            .suma(UPDATED_SUMA);

        restProduktKoszykMockMvc.perform(put("/api/produkt-koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduktKoszyk)))
            .andExpect(status().isOk());

        // Validate the ProduktKoszyk in the database
        List<ProduktKoszyk> produktKoszykList = produktKoszykRepository.findAll();
        assertThat(produktKoszykList).hasSize(databaseSizeBeforeUpdate);
        ProduktKoszyk testProduktKoszyk = produktKoszykList.get(produktKoszykList.size() - 1);
        assertThat(testProduktKoszyk.getIlosc()).isEqualTo(UPDATED_ILOSC);
        assertThat(testProduktKoszyk.getSuma()).isEqualTo(UPDATED_SUMA);
    }

    @Test
    @Transactional
    public void updateNonExistingProduktKoszyk() throws Exception {
        int databaseSizeBeforeUpdate = produktKoszykRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProduktKoszykMockMvc.perform(put("/api/produkt-koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produktKoszyk)))
            .andExpect(status().isBadRequest());

        // Validate the ProduktKoszyk in the database
        List<ProduktKoszyk> produktKoszykList = produktKoszykRepository.findAll();
        assertThat(produktKoszykList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProduktKoszyk() throws Exception {
        // Initialize the database
        produktKoszykRepository.saveAndFlush(produktKoszyk);

        int databaseSizeBeforeDelete = produktKoszykRepository.findAll().size();

        // Delete the produktKoszyk
        restProduktKoszykMockMvc.perform(delete("/api/produkt-koszyks/{id}", produktKoszyk.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProduktKoszyk> produktKoszykList = produktKoszykRepository.findAll();
        assertThat(produktKoszykList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
