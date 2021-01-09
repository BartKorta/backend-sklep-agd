package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class DostawaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dostawa.class);
        Dostawa dostawa1 = new Dostawa();
        dostawa1.setId(1L);
        Dostawa dostawa2 = new Dostawa();
        dostawa2.setId(dostawa1.getId());
        assertThat(dostawa1).isEqualTo(dostawa2);
        dostawa2.setId(2L);
        assertThat(dostawa1).isNotEqualTo(dostawa2);
        dostawa1.setId(null);
        assertThat(dostawa1).isNotEqualTo(dostawa2);
    }
}
