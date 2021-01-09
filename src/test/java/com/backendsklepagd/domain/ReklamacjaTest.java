package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class ReklamacjaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reklamacja.class);
        Reklamacja reklamacja1 = new Reklamacja();
        reklamacja1.setId(1L);
        Reklamacja reklamacja2 = new Reklamacja();
        reklamacja2.setId(reklamacja1.getId());
        assertThat(reklamacja1).isEqualTo(reklamacja2);
        reklamacja2.setId(2L);
        assertThat(reklamacja1).isNotEqualTo(reklamacja2);
        reklamacja1.setId(null);
        assertThat(reklamacja1).isNotEqualTo(reklamacja2);
    }
}
