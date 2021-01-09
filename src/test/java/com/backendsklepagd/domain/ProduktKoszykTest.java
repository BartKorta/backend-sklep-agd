package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class ProduktKoszykTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProduktKoszyk.class);
        ProduktKoszyk produktKoszyk1 = new ProduktKoszyk();
        produktKoszyk1.setId(1L);
        ProduktKoszyk produktKoszyk2 = new ProduktKoszyk();
        produktKoszyk2.setId(produktKoszyk1.getId());
        assertThat(produktKoszyk1).isEqualTo(produktKoszyk2);
        produktKoszyk2.setId(2L);
        assertThat(produktKoszyk1).isNotEqualTo(produktKoszyk2);
        produktKoszyk1.setId(null);
        assertThat(produktKoszyk1).isNotEqualTo(produktKoszyk2);
    }
}
