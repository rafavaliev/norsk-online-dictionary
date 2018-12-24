package no.dobrotrener.ordbok.web.rest;

import com.codahale.metrics.annotation.Timed;
import no.dobrotrener.ordbok.service.NativeWordService;
import no.dobrotrener.ordbok.web.rest.errors.BadRequestAlertException;
import no.dobrotrener.ordbok.web.rest.util.HeaderUtil;
import no.dobrotrener.ordbok.web.rest.util.PaginationUtil;
import no.dobrotrener.ordbok.service.dto.NativeWordDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing NativeWord.
 */
@RestController
@RequestMapping("/api")
public class NativeWordResource {

    private final Logger log = LoggerFactory.getLogger(NativeWordResource.class);

    private static final String ENTITY_NAME = "nativeWord";

    private final NativeWordService nativeWordService;

    public NativeWordResource(NativeWordService nativeWordService) {
        this.nativeWordService = nativeWordService;
    }

    /**
     * POST  /native-words : Create a new nativeWord.
     *
     * @param nativeWordDTO the nativeWordDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nativeWordDTO, or with status 400 (Bad Request) if the nativeWord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/native-words")
    @Timed
    public ResponseEntity<NativeWordDTO> createNativeWord(@RequestBody NativeWordDTO nativeWordDTO) throws URISyntaxException {
        log.debug("REST request to save NativeWord : {}", nativeWordDTO);
        if (nativeWordDTO.getId() != null) {
            throw new BadRequestAlertException("A new nativeWord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NativeWordDTO result = nativeWordService.save(nativeWordDTO);
        return ResponseEntity.created(new URI("/api/native-words/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /native-words : Updates an existing nativeWord.
     *
     * @param nativeWordDTO the nativeWordDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nativeWordDTO,
     * or with status 400 (Bad Request) if the nativeWordDTO is not valid,
     * or with status 500 (Internal Server Error) if the nativeWordDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/native-words")
    @Timed
    public ResponseEntity<NativeWordDTO> updateNativeWord(@RequestBody NativeWordDTO nativeWordDTO) throws URISyntaxException {
        log.debug("REST request to update NativeWord : {}", nativeWordDTO);
        if (nativeWordDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NativeWordDTO result = nativeWordService.save(nativeWordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nativeWordDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /native-words : get all the nativeWords.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of nativeWords in body
     */
    @GetMapping("/native-words")
    @Timed
    public ResponseEntity<List<NativeWordDTO>> getAllNativeWords(Pageable pageable) {
        log.debug("REST request to get a page of NativeWords");
        Page<NativeWordDTO> page = nativeWordService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/native-words");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /native-words/:id : get the "id" nativeWord.
     *
     * @param id the id of the nativeWordDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nativeWordDTO, or with status 404 (Not Found)
     */
    @GetMapping("/native-words/{id}")
    @Timed
    public ResponseEntity<NativeWordDTO> getNativeWord(@PathVariable String id) {
        log.debug("REST request to get NativeWord : {}", id);
        Optional<NativeWordDTO> nativeWordDTO = nativeWordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nativeWordDTO);
    }

    /**
     * DELETE  /native-words/:id : delete the "id" nativeWord.
     *
     * @param id the id of the nativeWordDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/native-words/{id}")
    @Timed
    public ResponseEntity<Void> deleteNativeWord(@PathVariable String id) {
        log.debug("REST request to delete NativeWord : {}", id);
        nativeWordService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    /**
     * SEARCH  /_search/native-words?query=:query : search for the nativeWord corresponding
     * to the query.
     *
     * @param query the query of the nativeWord search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/native-words")
    @Timed
    public ResponseEntity<List<NativeWordDTO>> searchNativeWords(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of NativeWords for query {}", query);
        Page<NativeWordDTO> page = nativeWordService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/native-words");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
