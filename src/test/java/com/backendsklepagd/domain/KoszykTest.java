package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class KoszykTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Koszyk.class);
        Koszyk koszyk1 = new Koszyk();
        koszyk1.setId(1L);
        Koszyk koszyk2 = new Koszyk();
        koszyk2.setId(koszyk1.getId());
        assertThat(koszyk1).isEqualTo(koszyk2);
        koszyk2.setId(2L);
        assertThat(koszyk1).isNotEqualTo(koszyk2);
        koszyk1.setId(null);
        assertThat(koszyk1).isNotEqualTo(koszyk2);
    }
}
