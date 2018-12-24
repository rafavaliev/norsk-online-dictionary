package no.dobrotrener.ordbok.domain;


import org.springframework.data.annotation.Id;

import java.io.Serializable;

@org.springframework.data.mongodb.core.mapping.Document(collection = "native_word")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "native_word_search",  type = "native_word")
public class NativeWord implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String id;

    private String word;

    private Language lang;

    public NativeWord(String word, Language lang) {
        this.word = word;
        this.lang = lang;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public Language getLang() {
        return lang;
    }

    public void setLang(Language lang) {
        this.lang = lang;
    }
}
