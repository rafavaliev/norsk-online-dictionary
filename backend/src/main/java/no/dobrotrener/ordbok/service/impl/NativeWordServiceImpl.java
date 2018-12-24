package no.dobrotrener.ordbok.service.impl;

import no.dobrotrener.ordbok.service.NativeWordService;
import no.dobrotrener.ordbok.domain.NativeWord;
import no.dobrotrener.ordbok.repository.NativeWordRepository;
import no.dobrotrener.ordbok.repository.search.NativeWordSearchRepository;
import no.dobrotrener.ordbok.service.dto.NativeWordDTO;
import no.dobrotrener.ordbok.service.mapper.NativeWordMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing NativeWord.
 */
@Service
public class NativeWordServiceImpl implements NativeWordService {

    private final Logger log = LoggerFactory.getLogger(NativeWordServiceImpl.class);

    private final NativeWordRepository nativeWordRepository;

    private final NativeWordMapper nativeWordMapper;

    private final NativeWordSearchRepository nativeWordSearchRepository;

    public NativeWordServiceImpl(NativeWordRepository nativeWordRepository, NativeWordMapper nativeWordMapper, NativeWordSearchRepository nativeWordSearchRepository) {
        this.nativeWordRepository = nativeWordRepository;
        this.nativeWordMapper = nativeWordMapper;
        this.nativeWordSearchRepository = nativeWordSearchRepository;
    }

    /**
     * Save a nativeWord.
     *
     * @param nativeWordDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public NativeWordDTO save(NativeWordDTO nativeWordDTO) {
        log.debug("Request to save NativeWord : {}", nativeWordDTO);

        NativeWord nativeWord = nativeWordMapper.toEntity(nativeWordDTO);
        nativeWord = nativeWordRepository.save(nativeWord);
        NativeWordDTO result = nativeWordMapper.toDto(nativeWord);
        nativeWordSearchRepository.save(nativeWord);
        return result;
    }

    /**
     * Get all the nativeWords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<NativeWordDTO> findAll(Pageable pageable) {
        log.debug("Request to get all NativeWords");
        return nativeWordRepository.findAll(pageable)
            .map(nativeWordMapper::toDto);
    }


    /**
     * Get one nativeWord by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<NativeWordDTO> findOne(String id) {
        log.debug("Request to get NativeWord : {}", id);
        return nativeWordRepository.findById(id)
            .map(nativeWordMapper::toDto);
    }

    /**
     * Delete the nativeWord by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete NativeWord : {}", id);
        nativeWordRepository.deleteById(id);
        nativeWordSearchRepository.deleteById(id);
    }

    /**
     * Search for the nativeWord corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<NativeWordDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of NativeWords for query {}", query);
        return nativeWordSearchRepository.search(queryStringQuery(query), pageable)
            .map(nativeWordMapper::toDto);
    }
}
