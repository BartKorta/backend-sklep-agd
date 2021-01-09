package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.ZamowienieRaport;
import com.backendsklepagd.repository.ZamowienieRaportRepository;

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
 * Integration tests for the {@link ZamowienieRaportResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ZamowienieRaportResourceIT {

    @Autowired
    private ZamowienieRaportRepository zamowienieRaportRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restZamowienieRaportMockMvc;

    private ZamowienieRaport zamowienieRaport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ZamowienieRaport createEntity(EntityManager em) {
        ZamowienieRaport zamowienieRaport = new ZamowienieRaport();
        return zamowienieRaport;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ZamowienieRaport createUpdatedEntity(EntityManager em) {
        ZamowienieRaport zamowienieRaport = new ZamowienieRaport();
        return zamowienieRaport;
    }

    @BeforeEach
    public void initTest() {
        zamowienieRaport = createEntity(em);
    }

    @Test
    @Transactional
    public void createZamowienieRaport() throws Exception {
        int databaseSizeBeforeCreate = zamowienieRaportRepository.findAll().size();
        // Create the ZamowienieRaport
        restZamowienieRaportMockMvc.perform(post("/api/zamowienie-raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zamowienieRaport)))
            .andExpect(status().isCreated());

        // Validate the ZamowienieRaport in the database
        List<ZamowienieRaport> zamowienieRaportList = zamowienieRaportRepository.findAll();
        assertThat(zamowienieRaportList).hasSize(databaseSizeBeforeCreate + 1);
        ZamowienieRaport testZamowienieRaport = zamowienieRaportList.get(zamowienieRaportList.size() - 1);
    }

    @Test
    @Transactional
    public void createZamowienieRaportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zamowienieRaportRepository.findAll().size();

        // Create the ZamowienieRaport with an existing ID
        zamowienieRaport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZamowienieRaportMockMvc.perform(post("/api/zamowienie-raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zamowienieRaport)))
            .andExpect(status().isBadRequest());

        // Validate the ZamowienieRaport in the database
        List<ZamowienieRaport> zamowienieRaportList = zamowienieRaportRepository.findAll();
        assertThat(zamowienieRaportList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllZamowienieRaports() throws Exception {
        // Initialize the database
        zamowienieRaportRepository.saveAndFlush(zamowienieRaport);

        // Get all the zamowienieRaportList
        restZamowienieRaportMockMvc.perform(get("/api/zamowienie-raports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zamowienieRaport.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getZamowienieRaport() throws Exception {
        // Initialize the database
        zamowienieRaportRepository.saveAndFlush(zamowienieRaport);

        // Get the zamowienieRaport
        restZamowienieRaportMockMvc.perform(get("/api/zamowienie-raports/{id}", zamowienieRaport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(zamowienieRaport.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingZamowienieRaport() throws Exception {
        // Get the zamowienieRaport
        restZamowienieRaportMockMvc.perform(get("/api/zamowienie-raports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZamowienieRaport() throws Exception {
        // Initialize the database
        zamowienieRaportRepository.saveAndFlush(zamowienieRaport);

        int databaseSizeBeforeUpdate = zamowienieRaportRepository.findAll().size();

        // Update the zamowienieRaport
        ZamowienieRaport updatedZamowienieRaport = zamowienieRaportRepository.findById(zamowienieRaport.getId()).get();
        // Disconnect from session so that the updates on updatedZamowienieRaport are not directly saved in db
        em.detach(updatedZamowienieRaport);

        restZamowienieRaportMockMvc.perform(put("/api/zamowienie-raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedZamowienieRaport)))
            .andExpect(status().isOk());

        // Validate the ZamowienieRaport in the database
        List<ZamowienieRaport> zamowienieRaportList = zamowienieRaportRepository.findAll();
        assertThat(zamowienieRaportList).hasSize(databaseSizeBeforeUpdate);
        ZamowienieRaport testZamowienieRaport = zamowienieRaportList.get(zamowienieRaportList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingZamowienieRaport() throws Exception {
        int databaseSizeBeforeUpdate = zamowienieRaportRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZamowienieRaportMockMvc.perform(put("/api/zamowienie-raports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zamowienieRaport)))
            .andExpect(status().isBadRequest());

        // Validate the ZamowienieRaport in the database
        List<ZamowienieRaport> zamowienieRaportList = zamowienieRaportRepository.findAll();
        assertThat(zamowienieRaportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZamowienieRaport() throws Exception {
        // Initialize the database
        zamowienieRaportRepository.saveAndFlush(zamowienieRaport);

        int databaseSizeBeforeDelete = zamowienieRaportRepository.findAll().size();

        // Delete the zamowienieRaport
        restZamowienieRaportMockMvc.perform(delete("/api/zamowienie-raports/{id}", zamowienieRaport.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ZamowienieRaport> zamowienieRaportList = zamowienieRaportRepository.findAll();
        assertThat(zamowienieRaportList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
