package no.dobrotrener.ordbok.service;

import no.dobrotrener.ordbok.service.dto.NativeWordDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing NativeWord.
 */
public interface NativeWordService {

    /**
     * Save a nativeWord.
     *
     * @param nativeWordDTO the entity to save
     * @return the persisted entity
     */
    NativeWordDTO save(NativeWordDTO nativeWordDTO);

    /**
     * Get all the nativeWords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<NativeWordDTO> findAll(Pageable pageable);


    /**
     * Get the "id" nativeWord.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<NativeWordDTO> findOne(String id);

    /**
     * Delete the "id" nativeWord.
     *
     * @param id the id of the entity
     */
    void delete(String id);

    /**
     * Search for the nativeWord corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<NativeWordDTO> search(String query, Pageable pageable);
}
