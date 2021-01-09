package com.backendsklepagd.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.backendsklepagd.web.rest.TestUtil;

public class ZamowienieRaportTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZamowienieRaport.class);
        ZamowienieRaport zamowienieRaport1 = new ZamowienieRaport();
        zamowienieRaport1.setId(1L);
        ZamowienieRaport zamowienieRaport2 = new ZamowienieRaport();
        zamowienieRaport2.setId(zamowienieRaport1.getId());
        assertThat(zamowienieRaport1).isEqualTo(zamowienieRaport2);
        zamowienieRaport2.setId(2L);
        assertThat(zamowienieRaport1).isNotEqualTo(zamowienieRaport2);
        zamowienieRaport1.setId(null);
        assertThat(zamowienieRaport1).isNotEqualTo(zamowienieRaport2);
    }
}
