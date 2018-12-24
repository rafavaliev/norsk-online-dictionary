package no.dobrotrener.ordbok.repository.search;

import no.dobrotrener.ordbok.domain.NativeWord;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the NativeWord entity.
 */
public interface NativeWordSearchRepository extends ElasticsearchRepository<NativeWord, String> {
}
