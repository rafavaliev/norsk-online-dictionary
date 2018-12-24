package no.dobrotrener.ordbok.repository.search;

import no.dobrotrener.ordbok.domain.NativeWord;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface NativeWordSearchRepository extends ElasticsearchRepository<NativeWord, String> {
}
