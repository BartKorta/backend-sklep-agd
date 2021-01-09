package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class PlatnoscTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Platnosc.class);
        Platnosc platnosc1 = new Platnosc();
        platnosc1.setId(1L);
        Platnosc platnosc2 = new Platnosc();
        platnosc2.setId(platnosc1.getId());
        assertThat(platnosc1).isEqualTo(platnosc2);
        platnosc2.setId(2L);
        assertThat(platnosc1).isNotEqualTo(platnosc2);
        platnosc1.setId(null);
        assertThat(platnosc1).isNotEqualTo(platnosc2);
    }
}
