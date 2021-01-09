package com.backendsklepagd.web.rest;

import com.backendsklepagd.BackendSklepAgdApp;
import com.backendsklepagd.domain.Platnosc;
import com.backendsklepagd.repository.PlatnoscRepository;

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
 * Integration tests for the {@link PlatnoscResource} REST controller.
 */
@SpringBootTest(classes = BackendSklepAgdApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlatnoscResourceIT {

    private static final Boolean DEFAULT_ELEKTRONICZNA = false;
    private static final Boolean UPDATED_ELEKTRONICZNA = true;

    private static final String DEFAULT_POSREDNIK = "AAAAAAAAAA";
    private static final String UPDATED_POSREDNIK = "BBBBBBBBBB";

    @Autowired
    private PlatnoscRepository platnoscRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlatnoscMockMvc;

    private Platnosc platnosc;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Platnosc createEntity(EntityManager em) {
        Platnosc platnosc = new Platnosc()
            .elektroniczna(DEFAULT_ELEKTRONICZNA)
            .posrednik(DEFAULT_POSREDNIK);
        return platnosc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Platnosc createUpdatedEntity(EntityManager em) {
        Platnosc platnosc = new Platnosc()
            .elektroniczna(UPDATED_ELEKTRONICZNA)
            .posrednik(UPDATED_POSREDNIK);
        return platnosc;
    }

    @BeforeEach
    public void initTest() {
        platnosc = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlatnosc() throws Exception {
        int databaseSizeBeforeCreate = platnoscRepository.findAll().size();
        // Create the Platnosc
        restPlatnoscMockMvc.perform(post("/api/platnoscs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(platnosc)))
            .andExpect(status().isCreated());

        // Validate the Platnosc in the database
        List<Platnosc> platnoscList = platnoscRepository.findAll();
        assertThat(platnoscList).hasSize(databaseSizeBeforeCreate + 1);
        Platnosc testPlatnosc = platnoscList.get(platnoscList.size() - 1);
        assertThat(testPlatnosc.isElektroniczna()).isEqualTo(DEFAULT_ELEKTRONICZNA);
        assertThat(testPlatnosc.getPosrednik()).isEqualTo(DEFAULT_POSREDNIK);
    }

    @Test
    @Transactional
    public void createPlatnoscWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = platnoscRepository.findAll().size();

        // Create the Platnosc with an existing ID
        platnosc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlatnoscMockMvc.perform(post("/api/platnoscs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(platnosc)))
            .andExpect(status().isBadRequest());

        // Validate the Platnosc in the database
        List<Platnosc> platnoscList = platnoscRepository.findAll();
        assertThat(platnoscList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlatnoscs() throws Exception {
        // Initialize the database
        platnoscRepository.saveAndFlush(platnosc);

        // Get all the platnoscList
        restPlatnoscMockMvc.perform(get("/api/platnoscs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(platnosc.getId().intValue())))
            .andExpect(jsonPath("$.[*].elektroniczna").value(hasItem(DEFAULT_ELEKTRONICZNA.booleanValue())))
            .andExpect(jsonPath("$.[*].posrednik").value(hasItem(DEFAULT_POSREDNIK)));
    }
    
    @Test
    @Transactional
    public void getPlatnosc() throws Exception {
        // Initialize the database
        platnoscRepository.saveAndFlush(platnosc);

        // Get the platnosc
        restPlatnoscMockMvc.perform(get("/api/platnoscs/{id}", platnosc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(platnosc.getId().intValue()))
            .andExpect(jsonPath("$.elektroniczna").value(DEFAULT_ELEKTRONICZNA.booleanValue()))
            .andExpect(jsonPath("$.posrednik").value(DEFAULT_POSREDNIK));
    }
    @Test
    @Transactional
    public void getNonExistingPlatnosc() throws Exception {
        // Get the platnosc
        restPlatnoscMockMvc.perform(get("/api/platnoscs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlatnosc() throws Exception {
        // Initialize the database
        platnoscRepository.saveAndFlush(platnosc);

        int databaseSizeBeforeUpdate = platnoscRepository.findAll().size();

        // Update the platnosc
        Platnosc updatedPlatnosc = platnoscRepository.findById(platnosc.getId()).get();
        // Disconnect from session so that the updates on updatedPlatnosc are not directly saved in db
        em.detach(updatedPlatnosc);
        updatedPlatnosc
            .elektroniczna(UPDATED_ELEKTRONICZNA)
            .posrednik(UPDATED_POSREDNIK);

        restPlatnoscMockMvc.perform(put("/api/platnoscs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlatnosc)))
            .andExpect(status().isOk());

        // Validate the Platnosc in the database
        List<Platnosc> platnoscList = platnoscRepository.findAll();
        assertThat(platnoscList).hasSize(databaseSizeBeforeUpdate);
        Platnosc testPlatnosc = platnoscList.get(platnoscList.size() - 1);
        assertThat(testPlatnosc.isElektroniczna()).isEqualTo(UPDATED_ELEKTRONICZNA);
        assertThat(testPlatnosc.getPosrednik()).isEqualTo(UPDATED_POSREDNIK);
    }

    @Test
    @Transactional
    public void updateNonExistingPlatnosc() throws Exception {
        int databaseSizeBeforeUpdate = platnoscRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlatnoscMockMvc.perform(put("/api/platnoscs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(platnosc)))
            .andExpect(status().isBadRequest());

        // Validate the Platnosc in the database
        List<Platnosc> platnoscList = platnoscRepository.findAll();
        assertThat(platnoscList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlatnosc() throws Exception {
        // Initialize the database
        platnoscRepository.saveAndFlush(platnosc);

        int databaseSizeBeforeDelete = platnoscRepository.findAll().size();

        // Delete the platnosc
        restPlatnoscMockMvc.perform(delete("/api/platnoscs/{id}", platnosc.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Platnosc> platnoscList = platnoscRepository.findAll();
        assertThat(platnoscList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
