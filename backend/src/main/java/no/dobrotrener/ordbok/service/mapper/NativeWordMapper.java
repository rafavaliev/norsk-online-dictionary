package no.dobrotrener.ordbok.service.mapper;

import no.dobrotrener.ordbok.domain.*;
import no.dobrotrener.ordbok.service.dto.NativeWordDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity NativeWord and its DTO NativeWordDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NativeWordMapper extends EntityMapper<NativeWordDTO, NativeWord> {



    default NativeWord fromId(String id) {
        if (id == null) {
            return null;
        }
        NativeWord nativeWord = new NativeWord();
        nativeWord.setId(id);
        return nativeWord;
    }
}
