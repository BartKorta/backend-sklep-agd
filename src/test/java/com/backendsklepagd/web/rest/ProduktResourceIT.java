package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.Produkt;
import com.backendsklepagd.repository.ProduktRepository;

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
 * Integration tests for the {@link ProduktResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProduktResourceIT {

    private static final String DEFAULT_NAZWA = "AAAAAAAAAA";
    private static final String UPDATED_NAZWA = "BBBBBBBBBB";

    private static final Double DEFAULT_CENA = 1D;
    private static final Double UPDATED_CENA = 2D;

    private static final String DEFAULT_OPIS = "AAAAAAAAAA";
    private static final String UPDATED_OPIS = "BBBBBBBBBB";

    private static final String DEFAULT_MOC = "AAAAAAAAAA";
    private static final String UPDATED_MOC = "BBBBBBBBBB";

    private static final String DEFAULT_DOSTEPNOSC = "AAAAAAAAAA";
    private static final String UPDATED_DOSTEPNOSC = "BBBBBBBBBB";

    private static final String DEFAULT_POJEMNOSC = "AAAAAAAAAA";
    private static final String UPDATED_POJEMNOSC = "BBBBBBBBBB";

    @Autowired
    private ProduktRepository produktRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProduktMockMvc;

    private Produkt produkt;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produkt createEntity(EntityManager em) {
        Produkt produkt = new Produkt()
            .nazwa(DEFAULT_NAZWA)
            .cena(DEFAULT_CENA)
            .opis(DEFAULT_OPIS)
            .moc(DEFAULT_MOC)
            .dostepnosc(DEFAULT_DOSTEPNOSC)
            .pojemnosc(DEFAULT_POJEMNOSC);
        return produkt;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produkt createUpdatedEntity(EntityManager em) {
        Produkt produkt = new Produkt()
            .nazwa(UPDATED_NAZWA)
            .cena(UPDATED_CENA)
            .opis(UPDATED_OPIS)
            .moc(UPDATED_MOC)
            .dostepnosc(UPDATED_DOSTEPNOSC)
            .pojemnosc(UPDATED_POJEMNOSC);
        return produkt;
    }

    @BeforeEach
    public void initTest() {
        produkt = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdukt() throws Exception {
        int databaseSizeBeforeCreate = produktRepository.findAll().size();
        // Create the Produkt
        restProduktMockMvc.perform(post("/api/produkts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produkt)))
            .andExpect(status().isCreated());

        // Validate the Produkt in the database
        List<Produkt> produktList = produktRepository.findAll();
        assertThat(produktList).hasSize(databaseSizeBeforeCreate + 1);
        Produkt testProdukt = produktList.get(produktList.size() - 1);
        assertThat(testProdukt.getNazwa()).isEqualTo(DEFAULT_NAZWA);
        assertThat(testProdukt.getCena()).isEqualTo(DEFAULT_CENA);
        assertThat(testProdukt.getOpis()).isEqualTo(DEFAULT_OPIS);
        assertThat(testProdukt.getMoc()).isEqualTo(DEFAULT_MOC);
        assertThat(testProdukt.getDostepnosc()).isEqualTo(DEFAULT_DOSTEPNOSC);
        assertThat(testProdukt.getPojemnosc()).isEqualTo(DEFAULT_POJEMNOSC);
    }

    @Test
    @Transactional
    public void createProduktWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produktRepository.findAll().size();

        // Create the Produkt with an existing ID
        produkt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProduktMockMvc.perform(post("/api/produkts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produkt)))
            .andExpect(status().isBadRequest());

        // Validate the Produkt in the database
        List<Produkt> produktList = produktRepository.findAll();
        assertThat(produktList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNazwaIsRequired() throws Exception {
        int databaseSizeBeforeTest = produktRepository.findAll().size();
        // set the field null
        produkt.setNazwa(null);

        // Create the Produkt, which fails.


        restProduktMockMvc.perform(post("/api/produkts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produkt)))
            .andExpect(status().isBadRequest());

        List<Produkt> produktList = produktRepository.findAll();
        assertThat(produktList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCenaIsRequired() throws Exception {
        int databaseSizeBeforeTest = produktRepository.findAll().size();
        // set the field null
        produkt.setCena(null);

        // Create the Produkt, which fails.


        restProduktMockMvc.perform(post("/api/produkts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produkt)))
            .andExpect(status().isBadRequest());

        List<Produkt> produktList = produktRepository.findAll();
        assertThat(produktList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProdukts() throws Exception {
        // Initialize the database
        produktRepository.saveAndFlush(produkt);

        // Get all the produktList
        restProduktMockMvc.perform(get("/api/produkts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produkt.getId().intValue())))
            .andExpect(jsonPath("$.[*].nazwa").value(hasItem(DEFAULT_NAZWA)))
            .andExpect(jsonPath("$.[*].cena").value(hasItem(DEFAULT_CENA.doubleValue())))
            .andExpect(jsonPath("$.[*].opis").value(hasItem(DEFAULT_OPIS)))
            .andExpect(jsonPath("$.[*].moc").value(hasItem(DEFAULT_MOC)))
            .andExpect(jsonPath("$.[*].dostepnosc").value(hasItem(DEFAULT_DOSTEPNOSC)))
            .andExpect(jsonPath("$.[*].pojemnosc").value(hasItem(DEFAULT_POJEMNOSC)));
    }
    
    @Test
    @Transactional
    public void getProdukt() throws Exception {
        // Initialize the database
        produktRepository.saveAndFlush(produkt);

        // Get the produkt
        restProduktMockMvc.perform(get("/api/produkts/{id}", produkt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(produkt.getId().intValue()))
            .andExpect(jsonPath("$.nazwa").value(DEFAULT_NAZWA))
            .andExpect(jsonPath("$.cena").value(DEFAULT_CENA.doubleValue()))
            .andExpect(jsonPath("$.opis").value(DEFAULT_OPIS))
            .andExpect(jsonPath("$.moc").value(DEFAULT_MOC))
            .andExpect(jsonPath("$.dostepnosc").value(DEFAULT_DOSTEPNOSC))
            .andExpect(jsonPath("$.pojemnosc").value(DEFAULT_POJEMNOSC));
    }
    @Test
    @Transactional
    public void getNonExistingProdukt() throws Exception {
        // Get the produkt
        restProduktMockMvc.perform(get("/api/produkts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdukt() throws Exception {
        // Initialize the database
        produktRepository.saveAndFlush(produkt);

        int databaseSizeBeforeUpdate = produktRepository.findAll().size();

        // Update the produkt
        Produkt updatedProdukt = produktRepository.findById(produkt.getId()).get();
        // Disconnect from session so that the updates on updatedProdukt are not directly saved in db
        em.detach(updatedProdukt);
        updatedProdukt
            .nazwa(UPDATED_NAZWA)
            .cena(UPDATED_CENA)
            .opis(UPDATED_OPIS)
            .moc(UPDATED_MOC)
            .dostepnosc(UPDATED_DOSTEPNOSC)
            .pojemnosc(UPDATED_POJEMNOSC);

        restProduktMockMvc.perform(put("/api/produkts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdukt)))
            .andExpect(status().isOk());

        // Validate the Produkt in the database
        List<Produkt> produktList = produktRepository.findAll();
        assertThat(produktList).hasSize(databaseSizeBeforeUpdate);
        Produkt testProdukt = produktList.get(produktList.size() - 1);
        assertThat(testProdukt.getNazwa()).isEqualTo(UPDATED_NAZWA);
        assertThat(testProdukt.getCena()).isEqualTo(UPDATED_CENA);
        assertThat(testProdukt.getOpis()).isEqualTo(UPDATED_OPIS);
        assertThat(testProdukt.getMoc()).isEqualTo(UPDATED_MOC);
        assertThat(testProdukt.getDostepnosc()).isEqualTo(UPDATED_DOSTEPNOSC);
        assertThat(testProdukt.getPojemnosc()).isEqualTo(UPDATED_POJEMNOSC);
    }

    @Test
    @Transactional
    public void updateNonExistingProdukt() throws Exception {
        int databaseSizeBeforeUpdate = produktRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProduktMockMvc.perform(put("/api/produkts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produkt)))
            .andExpect(status().isBadRequest());

        // Validate the Produkt in the database
        List<Produkt> produktList = produktRepository.findAll();
        assertThat(produktList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdukt() throws Exception {
        // Initialize the database
        produktRepository.saveAndFlush(produkt);

        int databaseSizeBeforeDelete = produktRepository.findAll().size();

        // Delete the produkt
        restProduktMockMvc.perform(delete("/api/produkts/{id}", produkt.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Produkt> produktList = produktRepository.findAll();
        assertThat(produktList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
