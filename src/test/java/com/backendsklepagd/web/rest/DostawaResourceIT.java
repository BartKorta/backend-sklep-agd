package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.Dostawa;
import com.backendsklepagd.repository.DostawaRepository;

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
 * Integration tests for the {@link DostawaResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DostawaResourceIT {

    private static final String DEFAULT_ADRES = "AAAAAAAAAA";
    private static final String UPDATED_ADRES = "BBBBBBBBBB";

    private static final String DEFAULT_NUMER_KONTAKTOWY = "AAAAAAAAAA";
    private static final String UPDATED_NUMER_KONTAKTOWY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATA_WYSYLKI = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA_WYSYLKI = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_DOSTAWCA = "AAAAAAAAAA";
    private static final String UPDATED_DOSTAWCA = "BBBBBBBBBB";

    @Autowired
    private DostawaRepository dostawaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDostawaMockMvc;

    private Dostawa dostawa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dostawa createEntity(EntityManager em) {
        Dostawa dostawa = new Dostawa()
            .adres(DEFAULT_ADRES)
            .numerKontaktowy(DEFAULT_NUMER_KONTAKTOWY)
            .dataWysylki(DEFAULT_DATA_WYSYLKI)
            .dostawca(DEFAULT_DOSTAWCA);
        return dostawa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dostawa createUpdatedEntity(EntityManager em) {
        Dostawa dostawa = new Dostawa()
            .adres(UPDATED_ADRES)
            .numerKontaktowy(UPDATED_NUMER_KONTAKTOWY)
            .dataWysylki(UPDATED_DATA_WYSYLKI)
            .dostawca(UPDATED_DOSTAWCA);
        return dostawa;
    }

    @BeforeEach
    public void initTest() {
        dostawa = createEntity(em);
    }

    @Test
    @Transactional
    public void createDostawa() throws Exception {
        int databaseSizeBeforeCreate = dostawaRepository.findAll().size();
        // Create the Dostawa
        restDostawaMockMvc.perform(post("/api/dostawas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dostawa)))
            .andExpect(status().isCreated());

        // Validate the Dostawa in the database
        List<Dostawa> dostawaList = dostawaRepository.findAll();
        assertThat(dostawaList).hasSize(databaseSizeBeforeCreate + 1);
        Dostawa testDostawa = dostawaList.get(dostawaList.size() - 1);
        assertThat(testDostawa.getAdres()).isEqualTo(DEFAULT_ADRES);
        assertThat(testDostawa.getNumerKontaktowy()).isEqualTo(DEFAULT_NUMER_KONTAKTOWY);
        assertThat(testDostawa.getDataWysylki()).isEqualTo(DEFAULT_DATA_WYSYLKI);
        assertThat(testDostawa.getDostawca()).isEqualTo(DEFAULT_DOSTAWCA);
    }

    @Test
    @Transactional
    public void createDostawaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dostawaRepository.findAll().size();

        // Create the Dostawa with an existing ID
        dostawa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDostawaMockMvc.perform(post("/api/dostawas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dostawa)))
            .andExpect(status().isBadRequest());

        // Validate the Dostawa in the database
        List<Dostawa> dostawaList = dostawaRepository.findAll();
        assertThat(dostawaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAdresIsRequired() throws Exception {
        int databaseSizeBeforeTest = dostawaRepository.findAll().size();
        // set the field null
        dostawa.setAdres(null);

        // Create the Dostawa, which fails.


        restDostawaMockMvc.perform(post("/api/dostawas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dostawa)))
            .andExpect(status().isBadRequest());

        List<Dostawa> dostawaList = dostawaRepository.findAll();
        assertThat(dostawaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumerKontaktowyIsRequired() throws Exception {
        int databaseSizeBeforeTest = dostawaRepository.findAll().size();
        // set the field null
        dostawa.setNumerKontaktowy(null);

        // Create the Dostawa, which fails.


        restDostawaMockMvc.perform(post("/api/dostawas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dostawa)))
            .andExpect(status().isBadRequest());

        List<Dostawa> dostawaList = dostawaRepository.findAll();
        assertThat(dostawaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDostawas() throws Exception {
        // Initialize the database
        dostawaRepository.saveAndFlush(dostawa);

        // Get all the dostawaList
        restDostawaMockMvc.perform(get("/api/dostawas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dostawa.getId().intValue())))
            .andExpect(jsonPath("$.[*].adres").value(hasItem(DEFAULT_ADRES)))
            .andExpect(jsonPath("$.[*].numerKontaktowy").value(hasItem(DEFAULT_NUMER_KONTAKTOWY)))
            .andExpect(jsonPath("$.[*].dataWysylki").value(hasItem(sameInstant(DEFAULT_DATA_WYSYLKI))))
            .andExpect(jsonPath("$.[*].dostawca").value(hasItem(DEFAULT_DOSTAWCA)));
    }
    
    @Test
    @Transactional
    public void getDostawa() throws Exception {
        // Initialize the database
        dostawaRepository.saveAndFlush(dostawa);

        // Get the dostawa
        restDostawaMockMvc.perform(get("/api/dostawas/{id}", dostawa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dostawa.getId().intValue()))
            .andExpect(jsonPath("$.adres").value(DEFAULT_ADRES))
            .andExpect(jsonPath("$.numerKontaktowy").value(DEFAULT_NUMER_KONTAKTOWY))
            .andExpect(jsonPath("$.dataWysylki").value(sameInstant(DEFAULT_DATA_WYSYLKI)))
            .andExpect(jsonPath("$.dostawca").value(DEFAULT_DOSTAWCA));
    }
    @Test
    @Transactional
    public void getNonExistingDostawa() throws Exception {
        // Get the dostawa
        restDostawaMockMvc.perform(get("/api/dostawas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDostawa() throws Exception {
        // Initialize the database
        dostawaRepository.saveAndFlush(dostawa);

        int databaseSizeBeforeUpdate = dostawaRepository.findAll().size();

        // Update the dostawa
        Dostawa updatedDostawa = dostawaRepository.findById(dostawa.getId()).get();
        // Disconnect from session so that the updates on updatedDostawa are not directly saved in db
        em.detach(updatedDostawa);
        updatedDostawa
            .adres(UPDATED_ADRES)
            .numerKontaktowy(UPDATED_NUMER_KONTAKTOWY)
            .dataWysylki(UPDATED_DATA_WYSYLKI)
            .dostawca(UPDATED_DOSTAWCA);

        restDostawaMockMvc.perform(put("/api/dostawas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDostawa)))
            .andExpect(status().isOk());

        // Validate the Dostawa in the database
        List<Dostawa> dostawaList = dostawaRepository.findAll();
        assertThat(dostawaList).hasSize(databaseSizeBeforeUpdate);
        Dostawa testDostawa = dostawaList.get(dostawaList.size() - 1);
        assertThat(testDostawa.getAdres()).isEqualTo(UPDATED_ADRES);
        assertThat(testDostawa.getNumerKontaktowy()).isEqualTo(UPDATED_NUMER_KONTAKTOWY);
        assertThat(testDostawa.getDataWysylki()).isEqualTo(UPDATED_DATA_WYSYLKI);
        assertThat(testDostawa.getDostawca()).isEqualTo(UPDATED_DOSTAWCA);
    }

    @Test
    @Transactional
    public void updateNonExistingDostawa() throws Exception {
        int databaseSizeBeforeUpdate = dostawaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDostawaMockMvc.perform(put("/api/dostawas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dostawa)))
            .andExpect(status().isBadRequest());

        // Validate the Dostawa in the database
        List<Dostawa> dostawaList = dostawaRepository.findAll();
        assertThat(dostawaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDostawa() throws Exception {
        // Initialize the database
        dostawaRepository.saveAndFlush(dostawa);

        int databaseSizeBeforeDelete = dostawaRepository.findAll().size();

        // Delete the dostawa
        restDostawaMockMvc.perform(delete("/api/dostawas/{id}", dostawa.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dostawa> dostawaList = dostawaRepository.findAll();
        assertThat(dostawaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
