package no.dobrotrener.ordbok.service.dto;

import java.io.Serializable;
import java.util.Objects;
import no.dobrotrener.ordbok.domain.enumeration.Language;

/**
 * A DTO for the NativeWord entity.
 */
public class NativeWordDTO implements Serializable {

    private String id;

    private String word;

    private Language lang;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NativeWordDTO nativeWordDTO = (NativeWordDTO) o;
        if (nativeWordDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nativeWordDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NativeWordDTO{" +
            "id=" + getId() +
            ", word='" + getWord() + "'" +
            ", lang='" + getLang() + "'" +
            "}";
    }
}
