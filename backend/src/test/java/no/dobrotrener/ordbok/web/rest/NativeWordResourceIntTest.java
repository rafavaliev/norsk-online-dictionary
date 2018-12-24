package no.dobrotrener.ordbok.web.rest;

import no.dobrotrener.ordbok.BackendApp;

import no.dobrotrener.ordbok.domain.NativeWord;
import no.dobrotrener.ordbok.repository.NativeWordRepository;
import no.dobrotrener.ordbok.repository.search.NativeWordSearchRepository;
import no.dobrotrener.ordbok.service.NativeWordService;
import no.dobrotrener.ordbok.service.dto.NativeWordDTO;
import no.dobrotrener.ordbok.service.mapper.NativeWordMapper;
import no.dobrotrener.ordbok.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import java.util.Collections;
import java.util.List;


import static no.dobrotrener.ordbok.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import no.dobrotrener.ordbok.domain.enumeration.Language;
/**
 * Test class for the NativeWordResource REST controller.
 *
 * @see NativeWordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApp.class)
public class NativeWordResourceIntTest {

    private static final String DEFAULT_WORD = "AAAAAAAAAA";
    private static final String UPDATED_WORD = "BBBBBBBBBB";

    private static final Language DEFAULT_LANG = Language.FRENCH;
    private static final Language UPDATED_LANG = Language.ENGLISH;

    @Autowired
    private NativeWordRepository nativeWordRepository;

    @Autowired
    private NativeWordMapper nativeWordMapper;

    @Autowired
    private NativeWordService nativeWordService;

    /**
     * This repository is mocked in the no.dobrotrener.ordbok.repository.search test package.
     *
     * @see no.dobrotrener.ordbok.repository.search.NativeWordSearchRepositoryMockConfiguration
     */
    @Autowired
    private NativeWordSearchRepository mockNativeWordSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restNativeWordMockMvc;

    private NativeWord nativeWord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NativeWordResource nativeWordResource = new NativeWordResource(nativeWordService);
        this.restNativeWordMockMvc = MockMvcBuilders.standaloneSetup(nativeWordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NativeWord createEntity() {
        NativeWord nativeWord = new NativeWord()
            .word(DEFAULT_WORD)
            .lang(DEFAULT_LANG);
        return nativeWord;
    }

    @Before
    public void initTest() {
        nativeWordRepository.deleteAll();
        nativeWord = createEntity();
    }

    @Test
    public void createNativeWord() throws Exception {
        int databaseSizeBeforeCreate = nativeWordRepository.findAll().size();

        // Create the NativeWord
        NativeWordDTO nativeWordDTO = nativeWordMapper.toDto(nativeWord);
        restNativeWordMockMvc.perform(post("/api/native-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nativeWordDTO)))
            .andExpect(status().isCreated());

        // Validate the NativeWord in the database
        List<NativeWord> nativeWordList = nativeWordRepository.findAll();
        assertThat(nativeWordList).hasSize(databaseSizeBeforeCreate + 1);
        NativeWord testNativeWord = nativeWordList.get(nativeWordList.size() - 1);
        assertThat(testNativeWord.getWord()).isEqualTo(DEFAULT_WORD);
        assertThat(testNativeWord.getLang()).isEqualTo(DEFAULT_LANG);

        // Validate the NativeWord in Elasticsearch
        verify(mockNativeWordSearchRepository, times(1)).save(testNativeWord);
    }

    @Test
    public void createNativeWordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nativeWordRepository.findAll().size();

        // Create the NativeWord with an existing ID
        nativeWord.setId("existing_id");
        NativeWordDTO nativeWordDTO = nativeWordMapper.toDto(nativeWord);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNativeWordMockMvc.perform(post("/api/native-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nativeWordDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NativeWord in the database
        List<NativeWord> nativeWordList = nativeWordRepository.findAll();
        assertThat(nativeWordList).hasSize(databaseSizeBeforeCreate);

        // Validate the NativeWord in Elasticsearch
        verify(mockNativeWordSearchRepository, times(0)).save(nativeWord);
    }

    @Test
    public void getAllNativeWords() throws Exception {
        // Initialize the database
        nativeWordRepository.save(nativeWord);

        // Get all the nativeWordList
        restNativeWordMockMvc.perform(get("/api/native-words?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nativeWord.getId())))
            .andExpect(jsonPath("$.[*].word").value(hasItem(DEFAULT_WORD.toString())))
            .andExpect(jsonPath("$.[*].lang").value(hasItem(DEFAULT_LANG.toString())));
    }
    
    @Test
    public void getNativeWord() throws Exception {
        // Initialize the database
        nativeWordRepository.save(nativeWord);

        // Get the nativeWord
        restNativeWordMockMvc.perform(get("/api/native-words/{id}", nativeWord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nativeWord.getId()))
            .andExpect(jsonPath("$.word").value(DEFAULT_WORD.toString()))
            .andExpect(jsonPath("$.lang").value(DEFAULT_LANG.toString()));
    }

    @Test
    public void getNonExistingNativeWord() throws Exception {
        // Get the nativeWord
        restNativeWordMockMvc.perform(get("/api/native-words/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateNativeWord() throws Exception {
        // Initialize the database
        nativeWordRepository.save(nativeWord);

        int databaseSizeBeforeUpdate = nativeWordRepository.findAll().size();

        // Update the nativeWord
        NativeWord updatedNativeWord = nativeWordRepository.findById(nativeWord.getId()).get();
        updatedNativeWord
            .word(UPDATED_WORD)
            .lang(UPDATED_LANG);
        NativeWordDTO nativeWordDTO = nativeWordMapper.toDto(updatedNativeWord);

        restNativeWordMockMvc.perform(put("/api/native-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nativeWordDTO)))
            .andExpect(status().isOk());

        // Validate the NativeWord in the database
        List<NativeWord> nativeWordList = nativeWordRepository.findAll();
        assertThat(nativeWordList).hasSize(databaseSizeBeforeUpdate);
        NativeWord testNativeWord = nativeWordList.get(nativeWordList.size() - 1);
        assertThat(testNativeWord.getWord()).isEqualTo(UPDATED_WORD);
        assertThat(testNativeWord.getLang()).isEqualTo(UPDATED_LANG);

        // Validate the NativeWord in Elasticsearch
        verify(mockNativeWordSearchRepository, times(1)).save(testNativeWord);
    }

    @Test
    public void updateNonExistingNativeWord() throws Exception {
        int databaseSizeBeforeUpdate = nativeWordRepository.findAll().size();

        // Create the NativeWord
        NativeWordDTO nativeWordDTO = nativeWordMapper.toDto(nativeWord);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNativeWordMockMvc.perform(put("/api/native-words")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nativeWordDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NativeWord in the database
        List<NativeWord> nativeWordList = nativeWordRepository.findAll();
        assertThat(nativeWordList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NativeWord in Elasticsearch
        verify(mockNativeWordSearchRepository, times(0)).save(nativeWord);
    }

    @Test
    public void deleteNativeWord() throws Exception {
        // Initialize the database
        nativeWordRepository.save(nativeWord);

        int databaseSizeBeforeDelete = nativeWordRepository.findAll().size();

        // Get the nativeWord
        restNativeWordMockMvc.perform(delete("/api/native-words/{id}", nativeWord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NativeWord> nativeWordList = nativeWordRepository.findAll();
        assertThat(nativeWordList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NativeWord in Elasticsearch
        verify(mockNativeWordSearchRepository, times(1)).deleteById(nativeWord.getId());
    }

    @Test
    public void searchNativeWord() throws Exception {
        // Initialize the database
        nativeWordRepository.save(nativeWord);
        when(mockNativeWordSearchRepository.search(queryStringQuery("id:" + nativeWord.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(nativeWord), PageRequest.of(0, 1), 1));
        // Search the nativeWord
        restNativeWordMockMvc.perform(get("/api/_search/native-words?query=id:" + nativeWord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nativeWord.getId())))
            .andExpect(jsonPath("$.[*].word").value(hasItem(DEFAULT_WORD)))
            .andExpect(jsonPath("$.[*].lang").value(hasItem(DEFAULT_LANG.toString())));
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NativeWord.class);
        NativeWord nativeWord1 = new NativeWord();
        nativeWord1.setId("id1");
        NativeWord nativeWord2 = new NativeWord();
        nativeWord2.setId(nativeWord1.getId());
        assertThat(nativeWord1).isEqualTo(nativeWord2);
        nativeWord2.setId("id2");
        assertThat(nativeWord1).isNotEqualTo(nativeWord2);
        nativeWord1.setId(null);
        assertThat(nativeWord1).isNotEqualTo(nativeWord2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NativeWordDTO.class);
        NativeWordDTO nativeWordDTO1 = new NativeWordDTO();
        nativeWordDTO1.setId("id1");
        NativeWordDTO nativeWordDTO2 = new NativeWordDTO();
        assertThat(nativeWordDTO1).isNotEqualTo(nativeWordDTO2);
        nativeWordDTO2.setId(nativeWordDTO1.getId());
        assertThat(nativeWordDTO1).isEqualTo(nativeWordDTO2);
        nativeWordDTO2.setId("id2");
        assertThat(nativeWordDTO1).isNotEqualTo(nativeWordDTO2);
        nativeWordDTO1.setId(null);
        assertThat(nativeWordDTO1).isNotEqualTo(nativeWordDTO2);
    }
}
