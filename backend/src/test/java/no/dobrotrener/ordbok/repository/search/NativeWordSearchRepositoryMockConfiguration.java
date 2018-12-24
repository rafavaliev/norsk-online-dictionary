package no.dobrotrener.ordbok.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of NativeWordSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class NativeWordSearchRepositoryMockConfiguration {

    @MockBean
    private NativeWordSearchRepository mockNativeWordSearchRepository;

}
