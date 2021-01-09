package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class ProduktTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Produkt.class);
        Produkt produkt1 = new Produkt();
        produkt1.setId(1L);
        Produkt produkt2 = new Produkt();
        produkt2.setId(produkt1.getId());
        assertThat(produkt1).isEqualTo(produkt2);
        produkt2.setId(2L);
        assertThat(produkt1).isNotEqualTo(produkt2);
        produkt1.setId(null);
        assertThat(produkt1).isNotEqualTo(produkt2);
    }
}
