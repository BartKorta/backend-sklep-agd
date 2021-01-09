package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class ZamowienieTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Zamowienie.class);
        Zamowienie zamowienie1 = new Zamowienie();
        zamowienie1.setId(1L);
        Zamowienie zamowienie2 = new Zamowienie();
        zamowienie2.setId(zamowienie1.getId());
        assertThat(zamowienie1).isEqualTo(zamowienie2);
        zamowienie2.setId(2L);
        assertThat(zamowienie1).isNotEqualTo(zamowienie2);
        zamowienie1.setId(null);
        assertThat(zamowienie1).isNotEqualTo(zamowienie2);
    }
}
