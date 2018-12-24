package no.dobrotrener.ordbok.repository;

import no.dobrotrener.ordbok.domain.NativeWord;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the NativeWord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NativeWordRepository extends MongoRepository<NativeWord, String> {

}
