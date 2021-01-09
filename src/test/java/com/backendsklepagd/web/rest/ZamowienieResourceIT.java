package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.Zamowienie;
import com.backendsklepagd.repository.ZamowienieRepository;

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
 * Integration tests for the {@link ZamowienieResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ZamowienieResourceIT {

    private static final Double DEFAULT_SUMA = 1D;
    private static final Double UPDATED_SUMA = 2D;

    private static final ZonedDateTime DEFAULT_DATA_ZAMOWIENIA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA_ZAMOWIENIA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ZamowienieRepository zamowienieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restZamowienieMockMvc;

    private Zamowienie zamowienie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Zamowienie createEntity(EntityManager em) {
        Zamowienie zamowienie = new Zamowienie()
            .suma(DEFAULT_SUMA)
            .dataZamowienia(DEFAULT_DATA_ZAMOWIENIA);
        return zamowienie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Zamowienie createUpdatedEntity(EntityManager em) {
        Zamowienie zamowienie = new Zamowienie()
            .suma(UPDATED_SUMA)
            .dataZamowienia(UPDATED_DATA_ZAMOWIENIA);
        return zamowienie;
    }

    @BeforeEach
    public void initTest() {
        zamowienie = createEntity(em);
    }

    @Test
    @Transactional
    public void createZamowienie() throws Exception {
        int databaseSizeBeforeCreate = zamowienieRepository.findAll().size();
        // Create the Zamowienie
        restZamowienieMockMvc.perform(post("/api/zamowienies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zamowienie)))
            .andExpect(status().isCreated());

        // Validate the Zamowienie in the database
        List<Zamowienie> zamowienieList = zamowienieRepository.findAll();
        assertThat(zamowienieList).hasSize(databaseSizeBeforeCreate + 1);
        Zamowienie testZamowienie = zamowienieList.get(zamowienieList.size() - 1);
        assertThat(testZamowienie.getSuma()).isEqualTo(DEFAULT_SUMA);
        assertThat(testZamowienie.getDataZamowienia()).isEqualTo(DEFAULT_DATA_ZAMOWIENIA);
    }

    @Test
    @Transactional
    public void createZamowienieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zamowienieRepository.findAll().size();

        // Create the Zamowienie with an existing ID
        zamowienie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZamowienieMockMvc.perform(post("/api/zamowienies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zamowienie)))
            .andExpect(status().isBadRequest());

        // Validate the Zamowienie in the database
        List<Zamowienie> zamowienieList = zamowienieRepository.findAll();
        assertThat(zamowienieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllZamowienies() throws Exception {
        // Initialize the database
        zamowienieRepository.saveAndFlush(zamowienie);

        // Get all the zamowienieList
        restZamowienieMockMvc.perform(get("/api/zamowienies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zamowienie.getId().intValue())))
            .andExpect(jsonPath("$.[*].suma").value(hasItem(DEFAULT_SUMA.doubleValue())))
            .andExpect(jsonPath("$.[*].dataZamowienia").value(hasItem(sameInstant(DEFAULT_DATA_ZAMOWIENIA))));
    }
    
    @Test
    @Transactional
    public void getZamowienie() throws Exception {
        // Initialize the database
        zamowienieRepository.saveAndFlush(zamowienie);

        // Get the zamowienie
        restZamowienieMockMvc.perform(get("/api/zamowienies/{id}", zamowienie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(zamowienie.getId().intValue()))
            .andExpect(jsonPath("$.suma").value(DEFAULT_SUMA.doubleValue()))
            .andExpect(jsonPath("$.dataZamowienia").value(sameInstant(DEFAULT_DATA_ZAMOWIENIA)));
    }
    @Test
    @Transactional
    public void getNonExistingZamowienie() throws Exception {
        // Get the zamowienie
        restZamowienieMockMvc.perform(get("/api/zamowienies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZamowienie() throws Exception {
        // Initialize the database
        zamowienieRepository.saveAndFlush(zamowienie);

        int databaseSizeBeforeUpdate = zamowienieRepository.findAll().size();

        // Update the zamowienie
        Zamowienie updatedZamowienie = zamowienieRepository.findById(zamowienie.getId()).get();
        // Disconnect from session so that the updates on updatedZamowienie are not directly saved in db
        em.detach(updatedZamowienie);
        updatedZamowienie
            .suma(UPDATED_SUMA)
            .dataZamowienia(UPDATED_DATA_ZAMOWIENIA);

        restZamowienieMockMvc.perform(put("/api/zamowienies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedZamowienie)))
            .andExpect(status().isOk());

        // Validate the Zamowienie in the database
        List<Zamowienie> zamowienieList = zamowienieRepository.findAll();
        assertThat(zamowienieList).hasSize(databaseSizeBeforeUpdate);
        Zamowienie testZamowienie = zamowienieList.get(zamowienieList.size() - 1);
        assertThat(testZamowienie.getSuma()).isEqualTo(UPDATED_SUMA);
        assertThat(testZamowienie.getDataZamowienia()).isEqualTo(UPDATED_DATA_ZAMOWIENIA);
    }

    @Test
    @Transactional
    public void updateNonExistingZamowienie() throws Exception {
        int databaseSizeBeforeUpdate = zamowienieRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZamowienieMockMvc.perform(put("/api/zamowienies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zamowienie)))
            .andExpect(status().isBadRequest());

        // Validate the Zamowienie in the database
        List<Zamowienie> zamowienieList = zamowienieRepository.findAll();
        assertThat(zamowienieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZamowienie() throws Exception {
        // Initialize the database
        zamowienieRepository.saveAndFlush(zamowienie);

        int databaseSizeBeforeDelete = zamowienieRepository.findAll().size();

        // Delete the zamowienie
        restZamowienieMockMvc.perform(delete("/api/zamowienies/{id}", zamowienie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Zamowienie> zamowienieList = zamowienieRepository.findAll();
        assertThat(zamowienieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
