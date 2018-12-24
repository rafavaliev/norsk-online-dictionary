package no.dobrotrener.ordbok.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

import no.dobrotrener.ordbok.domain.enumeration.Language;

/**
 * A NativeWord.
 */
@Document(collection = "native_word")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nativeword")
public class NativeWord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("word")
    private String word;

    @Field("lang")
    private Language lang;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public NativeWord word(String word) {
        this.word = word;
        return this;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public Language getLang() {
        return lang;
    }

    public NativeWord lang(Language lang) {
        this.lang = lang;
        return this;
    }

    public void setLang(Language lang) {
        this.lang = lang;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NativeWord nativeWord = (NativeWord) o;
        if (nativeWord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nativeWord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NativeWord{" +
            "id=" + getId() +
            ", word='" + getWord() + "'" +
            ", lang='" + getLang() + "'" +
            "}";
    }
}
