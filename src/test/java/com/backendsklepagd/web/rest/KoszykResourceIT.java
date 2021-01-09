package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.Koszyk;
import com.backendsklepagd.repository.KoszykRepository;

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
 * Integration tests for the {@link KoszykResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class KoszykResourceIT {

    @Autowired
    private KoszykRepository koszykRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKoszykMockMvc;

    private Koszyk koszyk;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Koszyk createEntity(EntityManager em) {
        Koszyk koszyk = new Koszyk();
        return koszyk;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Koszyk createUpdatedEntity(EntityManager em) {
        Koszyk koszyk = new Koszyk();
        return koszyk;
    }

    @BeforeEach
    public void initTest() {
        koszyk = createEntity(em);
    }

    @Test
    @Transactional
    public void createKoszyk() throws Exception {
        int databaseSizeBeforeCreate = koszykRepository.findAll().size();
        // Create the Koszyk
        restKoszykMockMvc.perform(post("/api/koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(koszyk)))
            .andExpect(status().isCreated());

        // Validate the Koszyk in the database
        List<Koszyk> koszykList = koszykRepository.findAll();
        assertThat(koszykList).hasSize(databaseSizeBeforeCreate + 1);
        Koszyk testKoszyk = koszykList.get(koszykList.size() - 1);
    }

    @Test
    @Transactional
    public void createKoszykWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = koszykRepository.findAll().size();

        // Create the Koszyk with an existing ID
        koszyk.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKoszykMockMvc.perform(post("/api/koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(koszyk)))
            .andExpect(status().isBadRequest());

        // Validate the Koszyk in the database
        List<Koszyk> koszykList = koszykRepository.findAll();
        assertThat(koszykList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllKoszyks() throws Exception {
        // Initialize the database
        koszykRepository.saveAndFlush(koszyk);

        // Get all the koszykList
        restKoszykMockMvc.perform(get("/api/koszyks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(koszyk.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getKoszyk() throws Exception {
        // Initialize the database
        koszykRepository.saveAndFlush(koszyk);

        // Get the koszyk
        restKoszykMockMvc.perform(get("/api/koszyks/{id}", koszyk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(koszyk.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingKoszyk() throws Exception {
        // Get the koszyk
        restKoszykMockMvc.perform(get("/api/koszyks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKoszyk() throws Exception {
        // Initialize the database
        koszykRepository.saveAndFlush(koszyk);

        int databaseSizeBeforeUpdate = koszykRepository.findAll().size();

        // Update the koszyk
        Koszyk updatedKoszyk = koszykRepository.findById(koszyk.getId()).get();
        // Disconnect from session so that the updates on updatedKoszyk are not directly saved in db
        em.detach(updatedKoszyk);

        restKoszykMockMvc.perform(put("/api/koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedKoszyk)))
            .andExpect(status().isOk());

        // Validate the Koszyk in the database
        List<Koszyk> koszykList = koszykRepository.findAll();
        assertThat(koszykList).hasSize(databaseSizeBeforeUpdate);
        Koszyk testKoszyk = koszykList.get(koszykList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingKoszyk() throws Exception {
        int databaseSizeBeforeUpdate = koszykRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKoszykMockMvc.perform(put("/api/koszyks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(koszyk)))
            .andExpect(status().isBadRequest());

        // Validate the Koszyk in the database
        List<Koszyk> koszykList = koszykRepository.findAll();
        assertThat(koszykList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKoszyk() throws Exception {
        // Initialize the database
        koszykRepository.saveAndFlush(koszyk);

        int databaseSizeBeforeDelete = koszykRepository.findAll().size();

        // Delete the koszyk
        restKoszykMockMvc.perform(delete("/api/koszyks/{id}", koszyk.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Koszyk> koszykList = koszykRepository.findAll();
        assertThat(koszykList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
